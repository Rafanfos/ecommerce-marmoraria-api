import { Request, Response } from "express";
import { createUserService } from "../services/auth.services";

const createUserController = async (req: Request, res: Response) => {
  const userData = req.body;

  const productsList = await createUserService(userData);

  return res.json(productsList);
};

export { createUserController };
