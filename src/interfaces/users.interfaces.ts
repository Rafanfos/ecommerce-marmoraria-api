interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
}

interface IUserLogin {
  username?: string;
  email?: string;
  password?: string;
}

interface ICreateUser extends IUser {
  password: string;
}

interface IUserDocument extends Document, ICreateUser {}

export { ICreateUser, IUser, IUserDocument, IUserLogin };
