

import { ProductModel } from "../model/product.model.js";






class ProductsPackagesManager{
    constructor(model){
        this.model=model
    }

   async getAll(page=1,limit=10,categoria,sort){
        try {
            const filter=categoria?{"categoria":categoria}:{}
            let OrderSort={};
            if (sort) {
                OrderSort.precio = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
            }

            return await this.model.paginate(filter,{page,limit,sort:OrderSort})
        } catch (error) {
            throw new Error(error)
        }

    }
   async create(obj){
        try {
           return await this.model.create(obj)

        } catch (error) {
            throw new Error(error)
        }

    }
    async getById(id){
        try {
           return await this.model.findById(id).explain()
       
        } catch (error) {
            throw new Error(error)
        }
    }

    async update(id,obj){
        try {
           return await this.model.findByIdAndUpdate(id,obj,{new:true})
         } catch (error) {
            throw new Error(error)
        }

    }
    async remove(id) {
        try {
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
          throw new Error(error);
        }
      }

    
     
      
    

      
}
export const productDao = new ProductsPackagesManager(ProductModel);



