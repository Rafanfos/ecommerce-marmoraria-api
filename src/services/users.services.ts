import { AppError } from "../errors/app.error";
import { IUser } from "../interfaces/users.interfaces";
import { UserModel } from "../models/users.model";

const updateUserService = async (userData: IUser) => {
  try {
    const { _id, ...updatedFields } = userData;

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id },
      { $set: updatedFields },
      { new: true, projection: { password: 0 } }
    );

    if (!updatedUser) {
      throw new AppError("Usuário não encontrado para atualização!", 404);
    }

    return updatedUser;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

export { updateUserService };
