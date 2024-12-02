import { Router } from "express";
import {  getAllCart,getCartById,createCart, addProductToCart} from "../controllers/cart.controller.js"




export const cartRouter = Router()

cartRouter.get("/",getAllCart)
cartRouter.get("/:id", getCartById)
cartRouter.post("/", createCart)
cartRouter.post("/:CartId/:ProductId", addProductToCart)








