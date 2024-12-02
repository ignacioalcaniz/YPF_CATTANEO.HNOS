
import { connect } from "mongoose"
import "dotenv/config"







const MONGO_URL = "mongodb://localhost:27017/flycordoba";

console.log(MONGO_URL);

export const initMongoDb=async()=>{
    try {
   await connect(MONGO_URL)
    } catch (error) {
        throw new Error(error)
    }
}