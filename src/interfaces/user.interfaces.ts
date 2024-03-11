interface IUser {
  name?: string;
  lastName?: string;
  username?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ICreateUser extends IUser {
  password: string;
}

export { IUser, ICreateUser };
