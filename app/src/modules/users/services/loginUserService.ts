import AppError from "../../../libs/errors/AppError";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { UserModel } from "../../../libs/mongoose/models/UserModel";

export const loginUserService = {
  execute: async (username: string, password: string): Promise<string> => {
    try {
        const user = await UserModel.findOne({ username }).exec();
  
        if (!user) {
          throw new AppError("Invalid username.", 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new AppError("Invalid password.", 401);
        }
  
        const token = jwt.sign({ id: user._id }, "your-secret-key", {
          expiresIn: "1h",
        });
  
        return token;
      } catch (error) {
        throw new AppError((error as Error).message, 500);
      }
  },
};
