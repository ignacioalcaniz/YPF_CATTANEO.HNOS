import { Router } from "express";
import {  getAllCart,getCartById,createCart, addProductToCart,removeProductFromCart,removeAllProductFromCart} from "../controllers/cart.controller.js"




export const cartRouter = Router()

cartRouter.get("/",getAllCart)
cartRouter.get("/:id", getCartById)
cartRouter.post("/", createCart)
cartRouter.post("/:CartId/:ProductId", addProductToCart)
cartRouter.delete("/:CartId/:ProductId",removeProductFromCart)
cartRouter.delete("/:CartId",removeAllProductFromCart)








