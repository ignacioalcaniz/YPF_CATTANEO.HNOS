import express from "express"
import { urlencoded } from "express";
import {packageRouter } from "./routes/products.router.js";
import { UserRouter } from "./routes/user.router.js";
import { cartRouter } from "./routes/cart.router.js";
import path from 'path';






const app = express();
app.use('/static', express.static(path.join(process.cwd(), "src", "public")));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api/products",packageRouter);
app.use("/api/users",UserRouter);
app.use("/api/cart",cartRouter);








app.listen(3000, () => console.log("listening on port 3000"))