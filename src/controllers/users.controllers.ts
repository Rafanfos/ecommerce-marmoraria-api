import { Request, Response } from "express";
import { updateUserService } from "../services/users.services";

const updateUserController = async (req: Request, res: Response) => {
  const userData = { _id: req.params.userId, ...req.body };

  const updatedData = await updateUserService(userData);

  return res.status(200).json({ data: updatedData });
};

export { updateUserController };
