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

        const cartExists = await CartManager.getCartById(idCart);
        if (!cartExists) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const prodExists = await prodManager.getProductbyId(idProd);
        if (!prodExists) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existsProdInCart = cartExists.products.find(prod => prod.id === idProd);

        if (!existsProdInCart) {

            const product = {
                id: idProd,
                nombre:prodExists.nombre,
                precio:prodExists.precio,
                personas:prodExists.cantidad_personas,
                imagen:prodExists.thumbnails,
                quantity:1
                
            };
            cartExists.products.push(product);
        } else {

            existsProdInCart.quantity += 1;
        }
        const response = await CartManager.saveProductToCart(idCart, idProd);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});







