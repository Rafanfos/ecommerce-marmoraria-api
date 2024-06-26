import { Schema, model } from "mongoose";
import { IProduct, IProductDocument } from "../interfaces/products.interface";
import MongooseDelete, {
  SoftDeleteDocument,
  SoftDeleteModel,
} from "mongoose-delete";

const productSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    path: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

productSchema.plugin(MongooseDelete, {
  deletedBy: true,
  deletedByType: String,
  deletedAt: true,
  overrideMethods: true,
});

const ProductModel: SoftDeleteModel<IProductDocument> = model<IProductDocument>(
  "Product",
  productSchema
) as SoftDeleteModel<IProductDocument>;

export { ProductModel };
