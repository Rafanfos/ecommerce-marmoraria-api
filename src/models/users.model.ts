import mongoose from "mongoose";
import {
  IAddress,
  IPhoneNumber,
  IUserDocument,
} from "../interfaces/users.interfaces";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const addressSchema = new Schema<IAddress>({
  postalCode: { type: String, required: true },
  number: { type: Number, required: true },
  street: { type: String, required: true },
  district: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const phoneSchema = new Schema<IPhoneNumber>({
  localCode: { type: Number, required: true },
  number: { type: Number, required: true },
});

const userSchema = new Schema<IUserDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    addresses: [addressSchema],
    phones: [phoneSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});

const UserModel = mongoose.model<IUserDocument>("User", userSchema);

export { UserModel };
