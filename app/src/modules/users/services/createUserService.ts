import { UserModel, IUser } from "../../../libs/mongoose/models/UserModel";
import AppError from "../../../libs/errors/AppError";

interface CreateUserParams {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export const createUserService = {
  execute: async (params: CreateUserParams): Promise<IUser> => {
    try {
      if (!params.username || !params.email || !params.password) {
        throw new AppError("Username, email, and password are required fields.", 400);
      }

      const existingUser = await UserModel.findOne({
        $or: [{ username: params.username }, { email: params.email }],
      }).exec();

      if (existingUser) {
        throw new AppError("Username or email already exists.", 400);
      }

      const newUser = await UserModel.create({
        username: params.username,
        email: params.email,
        password: params.password,
        isAdmin: params.isAdmin || false,
      });

      return newUser;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  },
};
