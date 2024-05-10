"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const users_middleares_1 = require("../middlewares/users.middleares");
const users_controllers_1 = require("../controllers/users.controllers");
const usersRouter = (0, express_1.Router)();
usersRouter.patch("/edit/:userId", auth_middleware_1.verifyAuthMiddleware, users_middleares_1.verifyAdminFieldMiddleware, users_middleares_1.verifyAdminRoleMiddleware, users_controllers_1.updateUserController);
exports.default = usersRouter;
//# sourceMappingURL=users.routes.js.map