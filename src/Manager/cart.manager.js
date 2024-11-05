import fs from "fs";
import {v4 as uuidv4  } from "uuid";
import { prodManager } from "./products.manager.js";




class CartPackageManager{
    constructor(path){
        this.path=path
    }

   async getAllCart(){

   try {
    if(fs.existsSync(this.path)){
        const cart=await fs.promises.readFile(this.path,"utf-8")
        const cartJson=JSON.parse(cart)
        return cartJson;
    }else{
        return [];
    }
   } catch (error) {
    throw new Error(error)
   }

    }
    async createCart(){
        try {
            const cart={
                id:uuidv4(),
                products:[],
            }
            const carts=await this.getAllCart();
            carts.push(cart)
            await fs.promises.writeFile(this.path,JSON.stringify(carts))
            return cart;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getCartById(id){
        try {
            const carts = await this.getAllCart();
            return carts.find((cart) => cart.id === id);
          } catch (error) {
            throw new Error(error);
          }
    }

    async saveProductToCart(idCart,IdProduct){
        try {
            const productExists= await prodManager.getProductbyId(IdProduct);
           if(!productExists)throw new Error(`product  does not exist`)
            let carts=await this.getAllCart();
            const cart=await this.getCartById(idCart)
        if(!cart)throw new Error(`cart  does not exist`)
            const existingProductInCart=cart.products.find((p)=>p.id===IdProduct)
        if(!existingProductInCart){
            const product={
                id:IdProduct,
                nombre:productExists.nombre,
                precio:productExists.precio,
                personas:productExists.cantidad_personas,
                imagen:productExists.thumbnails,
                quantity:1
                
            }
            cart.products.push(product)
        }else existingProductInCart.quantity +=1;

        const updateCart=carts.map((c)=>{ 
            if(c.id===idCart)return cart;
            return c
        }) 
        await fs.promises.writeFile(this.path,JSON.stringify(updateCart))
        return cart;
        } catch (error) {
            throw new Error(error);
        }
           


           

    }
}

export const CartManager= new  CartPackageManager("cart.json");