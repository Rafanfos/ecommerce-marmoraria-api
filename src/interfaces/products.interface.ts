import { SoftDeleteDocument } from "mongoose-delete";

interface IProduct {
  name: string;
  category?: string;
  path?: string;
  description?: string;
  price?: number;
}

interface IEditProduct {
  _id: string;
  name?: string;
  category?: string;
  path?: string;
  description?: string;
  price?: number;
}

interface IProductDocument extends IProduct, SoftDeleteDocument {}

export { IProductDocument, IProduct, IEditProduct };
