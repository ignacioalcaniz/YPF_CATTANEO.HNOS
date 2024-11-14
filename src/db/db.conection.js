import dotenv from 'dotenv'; 
import { connect } from "mongoose"
import "dotenv/config"
dotenv.config();






const MONGO_URL = process.env.MONGO_URL;

console.log(MONGO_URL);

export const initMongoDb=async()=>{
    try {
   await connect(MONGO_URL)
    } catch (error) {
        throw new Error(error)
    }
}