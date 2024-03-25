import mongoose from "mongoose";
import { IProductDocument } from "../interfaces/products.interface";

const productSchema = new mongoose.Schema<IProductDocument>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  path: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductModel = mongoose.model("Product", productSchema);

export { ProductModel };
