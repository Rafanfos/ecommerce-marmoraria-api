interface IUser {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ICreateUser extends IUser {
  password: string;
}

interface IUserDocument extends Document, ICreateUser {}

export { ICreateUser, IUser, IUserDocument };
