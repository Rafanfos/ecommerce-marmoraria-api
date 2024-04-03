import { Router } from "express";
import {
  createProductController,
  listProductsController,
  updateProductController,
} from "../controllers/products.controller";

const productsRouter = Router();

productsRouter.get("", listProductsController);
productsRouter.post("", createProductController);
productsRouter.post("", updateProductController);

export default productsRouter;
