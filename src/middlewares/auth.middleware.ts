import { UserModel } from "../models/users.model";
import { compare } from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces/users.interfaces";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../interfaces/auth.interfaces";
import dotenv from "dotenv";
dotenv.config();

const verifyEmailOrUsernameExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username } = req.body;

  const foundEmail = await UserModel.findOne({ email });
  const foundUsername = await UserModel.findOne({ username });

  if (foundEmail) {
    return res.status(409).json({ err: "E-mail já registrado!" });
  }

  if (foundUsername) {
    return res.status(409).json({ err: "Nome de usuário já registrado!" });
  }

  return next();
};

const validateLoginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password } = req.body;

  let loginUser: IUser | null = null;

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
    return res.status(403).json({ err: loginErrorMessage });
  }

  const passwordMatch = await compare(password, loginUser.password as string);

  if (!passwordMatch) {
    return res.status(403).json({ err: loginErrorMessage });
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
      msg: "Token inválido",
    });
  }

  token = token.split(" ")[1];

  if (!process.env.JWT_SECRET_KEY) {
    return res.status(500).json({
      msg: "Chave secreta não definida",
    });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    (error: jwt.VerifyErrors | null, decoded: any) => {
      if (error) {
        return res.status(401).json({
          err: "Erro ao verificar token!",
        });
      }

      req.user = {
        id: decoded.sub,
        isAdmin: decoded.isAdm,
      };

      return next();
    }
  );
};

export {
  verifyEmailOrUsernameExistsMiddleware,
  validateLoginMiddleware,
  verifyAuthMiddleware,
};
