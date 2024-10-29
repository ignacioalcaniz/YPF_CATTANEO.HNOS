import { Router } from "express";
 import { UserManager } from "../Manager/user.manager.js";
 import { userValidator } from "../Middlewares/user.validator.js";
 import { uploader } from "../Middlewares/multer.js";
 export const UserRouter=Router()
 const userM=new UserManager("./users.json")


 UserRouter.get("/", async (req, res) => {
    try {
        const users = await userM.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

UserRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userId = await userM.getUserById(id);
        res.status(200).json(userId);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

UserRouter.post("/", [userValidator], async (req, res) => {
    try {
        const user = await userM.createUser(req.body);
        res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

UserRouter.post("/uploader-file",uploader.single("profile") ,async (req, res) => {
    try {
        console.log(req.file)
        const userBody=req.body;
        userBody.profile=req.file.path
        const user = await userM.createUser(userBody);
        res.status(201).json({ id: user.id, email: user.email,profile:user.profile });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

UserRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userDel = await userM.deleteUserById(id);
        res.status(200).json({ message: `User id:${userDel.id} deleted successfully` });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

UserRouter.delete("/", async (req, res) => {
    try {
        await userM.deleteAllUsers();
        res.status(200).json({ message: "Users deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

UserRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userUpdate = await userM.updateUser(id, req.body);
        res.status(200).json({ message: `User with id: ${userUpdate.id} modified successfully` });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
