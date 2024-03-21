import express from "express";
import productsRouter from "./routes/products.routes";
import authRouter from "./routes/auth.routes";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);

export { app };
