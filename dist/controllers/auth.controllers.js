"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.createUserController = void 0;
const auth_services_1 = require("../services/auth.services");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const productsList = yield (0, auth_services_1.createUserService)(userData);
    return res.status(200).json(productsList);
});
exports.createUserController = createUserController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.body;
    const token = yield (0, auth_services_1.loginService)(loginData);
    return res.status(200).json({ token });
});
exports.loginController = loginController;
//# sourceMappingURL=auth.controllers.js.map