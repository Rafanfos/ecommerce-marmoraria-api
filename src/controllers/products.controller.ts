import { Request, Response } from "express";

const listProductsController = async (req: Request, res: Response) => {
  const productsList = [];

  return res.json(productsList);
};

export { listProductsController };
