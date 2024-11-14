import { Schema, model } from "mongoose";

export const productsCollectionName = "product";

const ProductSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    destino: { type: String, required: true },
    personas: { type: Number, required: true },
    dias: { type: Number, required: true },
    imagen:{type:String,required:true},
    categoria:{type:String,required:true}  
});

export const ProductModel = model(productsCollectionName, ProductSchema);