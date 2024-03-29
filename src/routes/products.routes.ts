import { Router } from "express";
import {
  createProductController,
  listProductsController,
} from "../controllers/products.controller";

const productsRouter = Router();

productsRouter.get("", listProductsController);
productsRouter.post("", createProductController);

export default productsRouter;
