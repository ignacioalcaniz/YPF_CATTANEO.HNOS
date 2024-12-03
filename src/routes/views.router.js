import { Router } from "express";
import { productDao } from "../daos/product.dao.js";
import { CartDao } from "../daos/cart.dao.js";


export const viewRoutes=Router();



viewRoutes.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 10, categoria, sort } = req.query;

        // Asegúrate de pasar estos parámetros a la función getAll
        const products = await productDao.getAll(page, limit, categoria, sort);
        
        

        // Limpiar los productos (eliminar propiedades innecesarias)
        const cleanedProducts = products.docs.map(product => {
            const { _id, __v, ...rest } = product.toObject();  // Asegúrate de que product es un documento de Mongoose
            return rest;
        });

        // Enviar los productos a la vista
        res.render("index", { products: cleanedProducts, pagination: products });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos", error: error.message });
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