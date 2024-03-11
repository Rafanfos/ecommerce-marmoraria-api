import { Router } from "express";
import { listProductsController } from "../controllers/products.controller";

const productsRouter = Router();

productsRouter.get("", listProductsController);

export default productsRouter;
