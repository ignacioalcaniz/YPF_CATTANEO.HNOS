import { Router } from "express";
import passport from "passport";
import { userController } from "../controllers/user.controller.js";



const UserRouter = Router();

UserRouter.post(
  "/register",
 
  userController.register
);

UserRouter.post(
  "/login",
  userController.login
);
UserRouter.get(
  "/current", 
  passport.authenticate("jwt"), 
  (req, res) => res.send(req.user)
);

export default UserRouter;