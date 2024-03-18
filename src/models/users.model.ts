import mongoose from "mongoose";
import { IUserDocument } from "../interfaces/users.interfaces";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema<IUserDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});

const UserModel = mongoose.model<IUserDocument>("User", userSchema);

export { UserModel };
