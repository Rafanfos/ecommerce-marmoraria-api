import {
  IUser,
  IUserDocument,
  IUserLogin,
} from "../interfaces/users.interfaces";
import { UserModel } from "../models/users.model";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/app.error";
import dotenv from "dotenv";
dotenv.config();

const createUserService = async (userData: IUser) => {
  const { firstName, lastName, email, username, password } = userData;

  const newUser = await UserModel.create({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  const newUserObject = newUser.toObject();

  delete newUserObject.password;

  return newUserObject;
};

const loginService = async (loginData: IUserLogin) => {
  const { email, username, password } = loginData;

  let user: IUserDocument | null = null;

  if (email) {
    user = await UserModel.findOne({ email }).exec();
  }

  if (username) {
    user = await UserModel.findOne({ username }).exec();
  }

  if (!user) {
    throw new AppError("Usuário não encontrado!", 404);
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdmin,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      subject: String(user._id),
      expiresIn: "24h",
    }
  );

  return token;
};

export { createUserService, loginService };
