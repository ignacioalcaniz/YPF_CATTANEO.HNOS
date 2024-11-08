import { Router } from "express";
import { CartManager } from "../Manager/cart.manager.js";
import { prodManager } from "../Manager/products.manager.js";



export const cartRouter = Router()

cartRouter.post("/", async (req, res) => {
    try {
        res.json(await CartManager.createCart())
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

})

cartRouter.get("/:idCart", async (req, res) => {
    try {
        const { idCart } = req.params;
        res.status(200).json(await CartManager.getCartById(idCart))
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})



cartRouter.post("/:idCart/product/:idProd", async (req, res) => {
    try {
        const { idProd } = req.params;
        const { idCart } = req.params;
        res.json(await CartManager.saveProductToCart(idCart, idProd));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});







