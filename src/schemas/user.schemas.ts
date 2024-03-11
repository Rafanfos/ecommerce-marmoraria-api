import * as yup from "yup";
import { Schema } from "yup";
import { IUser } from "../interfaces/user.interfaces";

const userWithoutPasswordSerializer: Schema<IUser> = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().notRequired(),
  lastName: yup.string().notRequired(),
  username: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
});

export { userWithoutPasswordSerializer };
