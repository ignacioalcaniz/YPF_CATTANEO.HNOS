import { Schema, model } from "mongoose";

export const cartCollectionName = "cart";

const cartSchema = new Schema({
    nombre: { type: String, required: true, index: true },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:"products",
            default:[]
        }
    ]
    
});



export const cartModel = model(cartCollectionName,cartSchema);