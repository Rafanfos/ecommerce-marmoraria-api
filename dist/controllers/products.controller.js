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
exports.deleteProductController = exports.updateProductController = exports.createProductController = exports.listProductsController = void 0;
const products_services_1 = require("../services/products.services");
const listProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, tags } = req.query;
    const productsList = yield (0, products_services_1.listProductsService)(category, tags);
    return res.status(200).json({ data: productsList });
});
exports.listProductsController = listProductsController;
const createProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    const createdProduct = yield (0, products_services_1.createProductService)(productData);
    return res.status(200).json({ data: createdProduct });
});
exports.createProductController = createProductController;
const updateProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = Object.assign({ _id: req.params.productId }, req.body);
    const updatedProduct = yield (0, products_services_1.updateProductService)(productData);
    return res.status(200).json({ data: updatedProduct });
});
exports.updateProductController = updateProductController;
const deleteProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { id } = req.user;
    yield (0, products_services_1.deleteProductService)(id, productId);
    return res.status(200).json({});
});
exports.deleteProductController = deleteProductController;
//# sourceMappingURL=products.controller.js.map