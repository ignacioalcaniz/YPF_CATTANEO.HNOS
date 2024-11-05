import express from "express"
import { urlencoded } from "express";
import {packageRouter } from "./routes/products.router.js";
import { UserRouter } from "./routes/user.router.js";
import { cartRouter } from "./routes/cart.router.js";
import path from 'path';
import handlebars from "express-handlebars"
import { viewRoutes } from "./routes/views.router.js";
import { Server } from "socket.io";








const app = express();
app.engine("handlebars",handlebars.engine());
app.set("views",path.join(process.cwd(),"views"))
app.set("view engine","handlebars")
app.use("/", express.static(path.join(process.cwd(),"public")));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api/products",packageRouter);
app.use("/api/users",UserRouter);
app.use("/api/cart",cartRouter);
app.use("/",viewRoutes);









 const httpServer=app.listen(3000, () => console.log("listening on port 3000"))
 const socketServer=new Server(httpServer)

 socketServer.on("connection",async(socket)=>{
    console.log("new connection :", socket.id)

    socket.on("disconnect",()=>{
        console.log("user disconnected:",socket.id)

    })

    socket.on("producto",()=>{

    })


   
  })