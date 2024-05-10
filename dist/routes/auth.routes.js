"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authRouter = (0, express_1.Router)();
authRouter.post("/register", auth_middleware_1.verifyEmailOrUsernameExistsMiddleware, auth_controllers_1.createUserController);
authRouter.post("/login", auth_middleware_1.validateLoginMiddleware, auth_controllers_1.loginController);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map