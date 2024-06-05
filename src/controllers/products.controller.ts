import { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  listProductsService,
  updateProductService,
} from "../services/products.services";
import { AuthenticatedRequest } from "../interfaces/auth.interfaces";
import { IRequestQueryProduct } from "../interfaces/products.interface";

const listProductsController = async (
  req: IRequestQueryProduct,
  res: Response
): Promise<Response> => {
  const { page, results, category, tags } = req.query;
  const pageNumber = Number(page);
  const pageResults = Number(results);
  const productsList = await listProductsService(
    pageNumber,
    pageResults,
    category,
    tags
  );

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

  const updatedProduct = await updateProductService(productData);

  return res.status(200).json({ data: updatedProduct });
};

const deleteProductController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { productId } = req.params;

  if (!req.user) {
    return res.status(401).json({
      msg: "Usuário não autenticado",
    });
  }

  const { id } = req.user;

  await deleteProductService(id, productId);

  return res.status(200).json({});
};

export {
  listProductsController,
  createProductController,
  updateProductController,
  deleteProductController,
};
