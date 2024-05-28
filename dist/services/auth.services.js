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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.createUserService = void 0;
const users_model_1 = require("../models/users.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_error_1 = require("../errors/app.error");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, username, password } = userData;
    const newUser = yield users_model_1.UserModel.create({
        firstName,
        lastName,
        email,
        username,
        password,
    });
    const newUserObject = newUser.toObject();
    delete newUserObject.password;
    return newUserObject;
});
exports.createUserService = createUserService;
const loginService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = loginData;
    let user = null;
    if (email) {
        user = yield users_model_1.UserModel.findOne({ email }).exec();
    }
    if (username) {
        user = yield users_model_1.UserModel.findOne({ username }).exec();
    }
    if (!user) {
        throw new app_error_1.AppError("Usuário não encontrado!", 404);
    }
    const token = jsonwebtoken_1.default.sign({
        isAdm: user.isAdmin,
    }, process.env.JWT_SECRET_KEY, {
        subject: String(user._id),
        expiresIn: "24h",
    });
    return token;
});
exports.loginService = loginService;
//# sourceMappingURL=auth.services.js.map