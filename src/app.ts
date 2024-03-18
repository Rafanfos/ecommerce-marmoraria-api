import express from "express";
import productsRouter from "./routes/products.routes";
import authRouter from "./routes/auth.routes";

const app = express();
app.use(express.json());

app.use("/products", productsRouter);
app.use("/auth", authRouter);

export { app };
