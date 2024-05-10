"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    path: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });
productSchema.plugin(mongoose_delete_1.default, {
    deletedBy: true,
    deletedByType: String,
    deletedAt: true,
    overrideMethods: true,
});
const ProductModel = (0, mongoose_1.model)("Product", productSchema);
exports.ProductModel = ProductModel;
//# sourceMappingURL=products.model.js.map