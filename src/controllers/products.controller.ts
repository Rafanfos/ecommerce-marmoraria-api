import { Request, Response } from "express";
import { listProductsService } from "../services/products.services";

const listProductsController = async (req: Request, res: Response) => {
  const productsList = await listProductsService();

  return res.status(200).json({ data: productsList });
};

export { listProductsController };
