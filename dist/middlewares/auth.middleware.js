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
exports.verifyAuthMiddleware = exports.validateLoginMiddleware = exports.verifyEmailOrUsernameExistsMiddleware = void 0;
const users_model_1 = require("../models/users.model");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyEmailOrUsernameExistsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username } = req.body;
    const foundEmail = yield users_model_1.UserModel.findOne({ email });
    const foundUsername = yield users_model_1.UserModel.findOne({ username });
    if (foundEmail) {
        return res.status(409).json({ err: "E-mail já registrado!" });
    }
    if (foundUsername) {
        return res.status(409).json({ err: "Nome de usuário já registrado!" });
    }
    return next();
});
exports.verifyEmailOrUsernameExistsMiddleware = verifyEmailOrUsernameExistsMiddleware;
const validateLoginMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    let loginUser;
    const loginErrorMessage = "Email, nome de usuário ou senha incorretos!";
    if (email) {
        loginUser = yield users_model_1.UserModel.findOne({
            email,
        });
    }
    if (username) {
        loginUser = yield users_model_1.UserModel.findOne({
            username,
        });
    }
    if (!loginUser) {
        return res.status(403).json({ err: loginErrorMessage });
    }
    const passwordMatch = yield (0, bcrypt_1.compare)(password, loginUser.password);
    if (!passwordMatch) {
        return res.status(403).json({ err: loginErrorMessage });
    }
    return next();
});
exports.validateLoginMiddleware = validateLoginMiddleware;
const verifyAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            msg: "Token inválido",
        });
    }
    token = token.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                err: "Erro ao verificar token!",
            });
        }
        req.user = {
            id: decoded.sub,
            isAdmin: decoded.isAdm,
        };
        return next();
    });
});
exports.verifyAuthMiddleware = verifyAuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map