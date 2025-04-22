import express from "express";
import { urlencoded } from "express";
import { packageRouter } from "./routes/products.router.js";
import { cartRouter } from "./routes/cart.router.js";
import path from 'path';
import handlebars from "express-handlebars";
import { viewRoutes } from "./routes/views.router.js";
import { Server } from "socket.io";
import { initMongoDb } from "./db/db.conection.js";
import { errorHandler } from "./Middlewares/error.handler.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user.router.js";
import passport from "passport";
import './config/passport/jwt-stratefy.js';


const app = express();


app.use(cookieParser()); 
app.use(urlencoded({ extended: true }));
app.use(express.json());

const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/",
    TtlSeconds: 180,
  }),
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 180000,
  },
};
app.use(session(sessionConfig));


app.use(passport.initialize());
app.use(passport.session());


app.use(errorHandler);


app.engine("handlebars", handlebars.engine());
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "handlebars");


app.use("/", express.static(path.join(process.cwd(), "public")));


app.use("/products", packageRouter);
app.use("/cart", cartRouter);
app.use("/", viewRoutes);
app.use("/user", UserRouter);

initMongoDb()
  .then(() => console.log("Conectado a la base de datos de MongoDB"))
  .catch((error) => console.log(error));


const httpServer = app.listen(8080, () => console.log("Listening on port 8080"));
const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
    console.log("new connection :", socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected:", socket.id);
    });
});






