import express from "express";
import productsRouter from "./routes/products.routes";
import authRouter from "./routes/auth.routes";
import bodyParser from "body-parser";
import usersRouter from "./routes/users.routes";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

export { app };
