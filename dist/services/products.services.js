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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductService = exports.updateProductService = exports.createProductService = exports.listProductsService = void 0;
const app_error_1 = require("../errors/app.error");
const products_model_1 = require("../models/products.model");
const listProductsService = (category, tags) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        if (category) {
            query.category = category;
        }
        if (tags) {
            query.tags = { $regex: tags, $options: "i" };
        }
        const products = yield products_model_1.ProductModel.find(query);
        return products;
    }
    catch (error) {
        console.log(error);
        throw new app_error_1.AppError("Erro ao listar produtos", 500);
    }
});
exports.listProductsService = listProductsService;
const createProductService = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield products_model_1.ProductModel.create(productData);
        return newProduct;
    }
    catch (error) {
        throw new app_error_1.AppError("Erro ao criar produto", 500);
    }
});
exports.createProductService = createProductService;
const updateProductService = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = productData, updatedFields = __rest(productData, ["_id"]);
    const updatedProduct = yield products_model_1.ProductModel.findByIdAndUpdate(_id, updatedFields);
    if (updatedProduct) {
        return updatedProduct;
    }
    throw new app_error_1.AppError("Erro ao atualizar produto", 404);
});
exports.updateProductService = updateProductService;
const deleteProductService = (userId, deleteId) => __awaiter(void 0, void 0, void 0, function* () {
    yield products_model_1.ProductModel.deleteById(deleteId, userId);
    return;
});
exports.deleteProductService = deleteProductService;
//# sourceMappingURL=products.services.js.map