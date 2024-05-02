import { SoftDeleteDocument } from "mongoose-delete";
import { Request } from "express";

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

interface IRequestQueryProduct extends Request {
  query: { category: string; tags: string };
}

interface IProductDocument extends IProduct, SoftDeleteDocument {}

export { IProductDocument, IProduct, IEditProduct, IRequestQueryProduct };
