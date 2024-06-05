import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  listProductsController,
  updateProductController,
} from "../controllers/products.controller";
import { verifyAuthMiddleware } from "../middlewares/auth.middleware";
import { verifyAdminRoleMiddleware } from "../middlewares/users.middleare";

const productsRouter = Router();

productsRouter.get("", listProductsController);
productsRouter.post(
  "",
  verifyAuthMiddleware,
  verifyAdminRoleMiddleware,
  createProductController
);
productsRouter.patch(
  "/:productId",
  verifyAuthMiddleware,
  verifyAdminRoleMiddleware,
  updateProductController
);
productsRouter.delete(
  "/:productId",
  verifyAuthMiddleware,
  verifyAdminRoleMiddleware,
  deleteProductController
);

export default productsRouter;
