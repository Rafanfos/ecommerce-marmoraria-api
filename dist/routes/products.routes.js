"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const users_middleares_1 = require("../middlewares/users.middleares");
const productsRouter = (0, express_1.Router)();
productsRouter.get("", products_controller_1.listProductsController);
productsRouter.post("", auth_middleware_1.verifyAuthMiddleware, users_middleares_1.verifyAdminRoleMiddleware, products_controller_1.createProductController);
productsRouter.patch("/:productId", auth_middleware_1.verifyAuthMiddleware, users_middleares_1.verifyAdminRoleMiddleware, products_controller_1.updateProductController);
productsRouter.delete("/:productId", auth_middleware_1.verifyAuthMiddleware, users_middleares_1.verifyAdminRoleMiddleware, products_controller_1.deleteProductController);
exports.default = productsRouter;
//# sourceMappingURL=products.routes.js.map