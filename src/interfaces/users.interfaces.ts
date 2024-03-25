interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
  isAdmin?: boolean;
}

interface IUserLogin {
  username?: string;
  email?: string;
  password?: string;
}

interface IUserDocument extends Document, IUser {}

export { IUser, IUserDocument, IUserLogin };
