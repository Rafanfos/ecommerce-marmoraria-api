import { AppError } from "../errors/app.error";
import { IUser } from "../interfaces/users.interfaces";
import { UserModel } from "../models/users.model";
// import { uploadAvatarToS3 } from "./s3.services";

// const updateUserService = async (userData: IUser) => {
//   try {
//     const { _id, ...updatedFields } = userData;

//     if (userData.avatar) {
//       await uploadAvatarToS3(userData.avatar, userData._id);
//     }

//     const updatedUser = await UserModel.findOneAndUpdate(
//       { _id },
//       { $set: updatedFields },
//       { new: true, projection: { password: 0 } }
//     );

//     if (!updatedUser) {
//       throw new AppError("Usuário não encontrado para atualização!", 404);
//     }

//     return updatedUser;
//   } catch (error) {
//     throw new AppError("Erro no servidor", 500);
//   }
// };

// export { updateUserService };
