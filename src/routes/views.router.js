import { Router } from "express";
import { productDao } from "../daos/product.dao.js";
import { CartDao } from "../daos/cart.dao.js";


export const viewRoutes=Router();



viewRoutes.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 10, categoria, sort } = req.query;

        
        const products = await productDao.getAll(page, limit, categoria, sort);
        
        

       
        const cleanedProducts = products.docs.map(product => {
            const { _id, __v, ...rest } = product.toObject();  
            return rest;
        });

        
        res.render("index", { products: cleanedProducts, pagination: products });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos", error: error.message });
    }
});




viewRoutes.get("/carrito",async(req,res)=>{
    try {
        const cart=await  CartDao.getAll()
        res.render("carrito",{cart})
    } catch (error) {
        res.status(500).send("Error al obtener los productos del carrito");
    }
})