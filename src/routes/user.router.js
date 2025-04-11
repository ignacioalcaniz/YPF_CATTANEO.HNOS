import { Router } from "express";
import passport from "passport";
import { isAuth } from "../Middlewares/is-auth.js";
import { userController } from "../controllers/user.controller.js";


const UserRouter = Router();

UserRouter.post(
  "/register",
  passport.authenticate("register"),
  userController.register
);

UserRouter.post(
  "/login",
  passport.authenticate("login"),
  userController.login
);
UserRouter.get("/private", isAuth, (req, res) => res.send("ruta privada"));

export default UserRouter;