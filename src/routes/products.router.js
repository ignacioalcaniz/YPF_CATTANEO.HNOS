import { Router } from "express";
import { getAll,create,update, remove, getById} from "../controllers/product.controller.js"




export const packageRouter = Router();

packageRouter.get("/", getAll)
packageRouter.get("/:id", getById)
packageRouter.post("/", create)
packageRouter.delete("/:id", remove)
packageRouter.put("/:id", update)

