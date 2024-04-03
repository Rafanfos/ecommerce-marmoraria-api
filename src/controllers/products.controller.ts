import { Request, Response } from "express";
import {
  createProductService,
  listProductsService,
} from "../services/products.services";

const listProductsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const productsList = await listProductsService();

  return res.status(200).json({ data: productsList });
};

const createProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const productData = req.body;

  const createdProduct = await createProductService(productData);

  return res.status(200).json({ data: createdProduct });
};

const updateProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const productData = { _id: req.params.productId, ...req.body };

  const updatedProduct = await createProductService(productData);

  return res.status(200).json({ data: updatedProduct });
};

export {
  listProductsController,
  createProductController,
  updateProductController,
};
