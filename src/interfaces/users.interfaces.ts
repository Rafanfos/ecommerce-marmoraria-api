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
  addresses?: IAddress[];
  phones?: IPhoneNumber[];
}

interface IUserLogin {
  username?: string;
  email?: string;
  password?: string;
}

interface IAddress {
  postalCode: string;
  number: number;
  street: string;
  district?: string;
  city: string;
  state: string;
}

interface IPhoneNumber {
  localCode: number;
  number: number;
}

interface IUserDocument extends Document, IUser {}

export { IUser, IUserDocument, IUserLogin, IAddress, IPhoneNumber };
