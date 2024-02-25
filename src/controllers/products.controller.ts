import { Request, Response } from "express";
import { listProductsService } from "../services/products.services";

const listProductsController = async (req: Request, res: Response) => {
  const productsList = await listProductsService();

  return res.json(productsList);
};

export { listProductsController };
