

import { ProductModel } from "../model/product.model.js";






class ProductsPackagesManager{
    constructor(model){
        this.model=model
    }

   async getAll(){
        try {
            return await this.model.find({})
        } catch (error) {
            throw new Error(error)
        }

    }
   async createProduct(obj){
        try {
           return await this.model.create(obj)

        } catch (error) {
            throw new Error(error)
        }

    }
    async getProductbyId(id){
        try {
           return await this.model.findById(id)
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateProduct(id,obj){
        try {
           return await this.model.findByIdAndUpdate(id,obj,{new:true})
         } catch (error) {
            throw new Error(error)
        }

    }
    async deleteById(id) {
        try {
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
          throw new Error(error);
        }
      }
      
    

      
}
export const prodManager = new ProductsPackagesManager(ProductModel);



