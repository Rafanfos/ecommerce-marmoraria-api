import mongoose from "mongoose";
import { IUserDocument } from "../interfaces/users.interfaces";

const { Schema } = mongoose;

const UserSchema = new Schema<IUserDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model<IUserDocument>("User", UserSchema);

export { UserModel };
