import { Router } from "express";
import { productDao } from "../daos/product.dao.js";
import { CartDao } from "../daos/cart.dao.js";


export const viewRoutes=Router();



viewRoutes.get("/", async (req, res) => {
    try {
        const products = await productDao.getAll(); 
        
     
        const cleanedProducts = products.map(product => {
            const { _id, __v, ...rest } = product.toObject();  
            return rest;  
        });

        res.render("home", { products: cleanedProducts });
    } catch (error) {
        res.status(500).send("Error al obtener los productos");
    }
});



viewRoutes.get("/carrito",async(req,res)=>{
    try {
        const cart=await  CartDao.getAllCart()
        res.render("carrito",{cart})
    } catch (error) {
        res.status(500).send("Error al obtener los productos del carrito");
    }
})