import { ICreateUser, IUser } from "../interfaces/users.interfaces";

const removeUserPassword = (userData: ICreateUser): IUser => {
  const { firstName, lastName, email, username, createdAt, updatedAt } =
    userData;

  const userWithoutPassword = {
    firstName,
    lastName,
    email,
    username,
    createdAt,
    updatedAt,
  };

  return userWithoutPassword;
};

export { removeUserPassword };
