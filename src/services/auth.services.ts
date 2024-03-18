import { ICreateUser } from "../interfaces/users.interfaces";
import { UserModel } from "../models/users.model";

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

  return savedUser;
};

export { createUserService };
