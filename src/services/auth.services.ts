import { Document, Types } from "mongoose";
import {
  ICreateUser,
  IUserDocument,
  IUserLogin,
} from "../interfaces/users.interfaces";
import { UserModel } from "../models/users.model";
import { removeUserPassword } from "../utils/users.utils";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/app.error";

const createUserService = async (userData: ICreateUser) => {
  const { firstName, lastName, email, username, password } = userData;

  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  const savedUser = await newUser.save();

  const userWithouPassword = removeUserPassword(savedUser);

  return userWithouPassword;
};

const loginService = async (loginData: IUserLogin) => {
  const { email, username, password } = loginData;

  let user: IUserDocument;

  if (email) {
    user = await UserModel.findOne({ email }).exec();
  }

  if (username) {
    user = await UserModel.findOne({ username }).exec();
  }

  if (!user) {
    throw new AppError("Usuário não encontrado!", 404);
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

export { createUserService, loginService };
