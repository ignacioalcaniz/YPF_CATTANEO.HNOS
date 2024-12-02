import { cartModel } from "../model/cart.model.js";




class CartPackageManager{
    constructor(model){
        this.model=model
    }


    async getAll() {
      try {
        return await this.model.find({});
      } catch (error) {
        throw new Error(error);
      }
    }
  
    async createCart({nombre}) {
        try {
          return await this.model.create({nombre});
        } catch (error) {
          throw new Error(error);
        }
      }

      async getCartById(id) {
        try {
          const response = await this.model.findById(id).populate("products"); 
          return response;
        } catch (error) {
          throw new Error(error);
        }
      }

     

      async removeAllProducts(id) {
     
      }

    async addProductToCart(cartId, ProductId){
        try {
            const response = await this.model.findByIdAndUpdate(
                cartId,
                { $push: { products: ProductId } },
                { new: true }
            );       
            return response
        } catch (error) {
            throw new Error(error);
        }
      }



      async removeProductFromCart(cartId,ProductId){
        try {
          
        } catch (error) {
          
        }
      }
    }


export const CartDao= new  CartPackageManager(cartModel);