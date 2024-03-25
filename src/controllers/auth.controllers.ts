import { Request, Response } from "express";
import { createUserService, loginService } from "../services/auth.services";
import { IUserLogin } from "../interfaces/users.interfaces";

const createUserController = async (req: Request, res: Response) => {
  const userData = req.body;

  const productsList = await createUserService(userData);

  return res.status(200).json(productsList);
};

const loginController = async (req: Request, res: Response) => {
  const loginData: IUserLogin = req.body;
  const token = await loginService(loginData);

  return res.status(200).json({ token });
};

export { createUserController, loginController };
