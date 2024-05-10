"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/api/products", products_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", users_routes_1.default);
//# sourceMappingURL=app.js.map