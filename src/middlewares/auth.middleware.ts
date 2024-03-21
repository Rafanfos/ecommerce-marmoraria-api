import { UserModel } from "../models/users.model";
import { compare } from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces/users.interfaces";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

const verifyEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const foundEmail = UserModel.findOne({ email });

  if (foundEmail) {
    return res.status(409).json({ message: "E-mail já registrado!" });
  }

  return next();
};

const validateLoginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password } = req.body;

  let loginUser: IUser;

  const loginErrorMessage = "Email, nome de usuário ou senha incorretos!";

  if (email) {
    loginUser = await UserModel.findOne({
      email,
    });
  }

  if (username) {
    loginUser = await UserModel.findOne({
      username,
    });
  }

  if (!loginUser) {
    return res.status(403).json({ msg: loginErrorMessage });
  }

  const passwordMatch = await compare(password, loginUser.password);

  if (!passwordMatch) {
    return res.status(403).json({ msg: loginErrorMessage });
  }

  return next();
};

const verifyAuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Token inválido",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (error: Error, decoded: any) => {
    if (error) {
      return res.status(401).json({
        message: "Erroa o verificar token!",
      });
    }

    req.user = {
      id: decoded.sub as string,
    };

    return next();
  });
};

export {
  verifyEmailExistsMiddleware,
  validateLoginMiddleware,
  verifyAuthMiddleware,
};
