import fs from "fs";
import crypto, { createHmac } from "crypto";
import { v4 as uuidv4 } from "uuid";

export class UserManager {
    constructor(path) {
        this.path = path;
    }

    #createHash(user) {
        user.salt = crypto.randomBytes(128).toString();
        user.password = createHmac('sha256', user.salt).update(user.password).digest("hex");
    }

    async getUsers() {
        try {
            if (fs.existsSync(this.path)) {
                const users = await fs.promises.readFile(this.path, "utf8");
                return JSON.parse(users);
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async createUser(obj) {
        try {
            const user = {
                id: uuidv4(),
                ...obj
            };
            const users = await this.getUsers();
            const existingUser = users.find((u) => u.id === user.id);
            if (existingUser) {
                throw new Error("User already exists");
            }
            this.#createHash(user);
            users.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(users));
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserById(id) {
        try {
            const users = await this.getUsers();
            if (!users.length > 0) throw new Error("User list is empty");
            const user = users.find((u) => u.id === id);
            if (!user) throw new Error("User not found");
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateUser(id, obj) {
        try {
            const users = await this.getUsers();
            let user = await this.getUserById(id);
            user = { ...user, ...obj };
            if (obj.password) this.#createHash(user);
            const newArray = users.filter((u) => u.id !== id);
            newArray.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteUserById(id) {
        try {
            const users = await this.getUsers();
            const user = await this.getUserById(id);
            const newArray = users.filter((u) => u.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAllUsers() {
        const users = await this.getUsers();
        if (!users.length > 0) throw new Error("User list is empty");
        await fs.promises.unlink(this.path);
    }
}
