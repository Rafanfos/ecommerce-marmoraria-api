import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  path: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductModel = mongoose.model("Product", productSchema);

export { ProductModel };
