import { Router } from "express";
import { getAll,createProduct,updateProduct, deleteById, getProductById} from "../controllers/product.controller.js"




export const packageRouter = Router();

packageRouter.get("/", getAll)
packageRouter.get("/:id", getProductById)
packageRouter.post("/", createProduct)
packageRouter.delete("/:id", deleteById)
packageRouter.put("/:id", updateProduct)

