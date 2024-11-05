import fs from "fs";
import { v4 as uuidv4 } from "uuid";






class ProductsPackagesManager{
    constructor(path){
        this.path=path
    }
   async getAll(){
        try {
            if(fs.existsSync(this.path)){
                const products=await fs.promises.readFile(this.path,"utf-8");
                return JSON.parse(products)

            }else{
                await fs.promises.writeFile(this.path, JSON.stringify([]));
                return [];
            }
        } catch (error) {
            throw new Error(error)
        }

    }
   async createProduct(obj){
        try {
            const product={
                id:uuidv4(),
                ...obj
            }
            const products=await this.getAll()
            const existProduct= await products.find((p)=>p.id===product.id)
            if(existProduct){
                throw new Error("product already exists")
            }
            products.push(product)
            await fs.promises.writeFile(this.path,JSON.stringify(products))
            return product

        } catch (error) {
            throw new Error(error)
        }

    }
    async getProductbyId(id){
        try {
            const products=await this.getAll();
           if(products.length===0){
            throw new Error("product list is empty")
           }
           const product=products.find((p)=>p.id===id)
           if(!product){
            throw new Error("product not found")
           }
           return product
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateProduct(id,obj){
        try {
            const products=await this.getAll();
            let productId =await this.getProductbyId(id)
            productId={...productId,...obj}      
            const newArray=products.filter((p)=>p.id !==id)
            newArray.push(productId)
            await fs.promises.writeFile(this.path,JSON.stringify(newArray));
            return productId
         } catch (error) {
            throw new Error(error)
        }

    }
    async deleteById(id) {
        try {
          const productId = await this.getProductbyId(id);
          const products = await this.getAll();
          const newArray = products.filter((p) => p.id !== id);
          await fs.promises.writeFile(this.path, JSON.stringify(newArray));
          return productId;
        } catch (error) {
          throw new Error(error);
        }
      }
      async deleteAll() {
        try {
          const products = await this.getAll();
          if (!products.length > 0) throw new Error("products list is empty");
          await fs.promises.unlink(this.path);
        } catch (error) {
          throw new Error(error);
        }
      }
    

      
}
export const prodManager = new ProductsPackagesManager("products.json");



