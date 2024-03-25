import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error";

interface AuthenticatedRequest extends Request {
  user?: {
    id?: string;
    isAdmin?: boolean;
    adminRoleUpdate?: boolean;
  };
}

const verifyAdminFieldMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { isAdmin } = req.body;

  if (isAdmin !== undefined) {
    req.user.adminRoleUpdate = true;
  }

  return next();
};

const verifyAdminRoleMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { isAdmin, adminRoleUpdate } = req.user;

  if (!adminRoleUpdate) {
    next();
  }

  if (!isAdmin) {
    res.status(400).json({ err: "Só adms podem atualizar outros adms!" });
  }

  return next();
};

export { verifyAdminFieldMiddleware, verifyAdminRoleMiddleware };
