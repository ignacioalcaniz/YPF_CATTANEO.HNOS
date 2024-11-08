import { Router } from "express";
import { prodManager } from "../Manager/products.manager.js";
import { CartManager } from "../Manager/cart.manager.js";


export const viewRoutes=Router();



viewRoutes.get("/", async (req, res) => {
    try {
        const products = await prodManager.getAll(); 
        res.render("home", { products });
    } catch (error) {
        res.status(500).send("Error al obtener los productos");
    }
});

viewRoutes.get("/realtimeproducts",  (req, res) => {
    try {
      
        res.render("realtimeproducts");
    } catch (error) {
      
        res.status(500).send("Error al obtener los productos");
    }
});


viewRoutes.get("/carrito",async(req,res)=>{
    try {
        const cart=await CartManager.getAllCart()
        res.render("carrito",{cart})
    } catch (error) {
        res.status(500).send("Error al obtener los productos del carrito");
    }
})