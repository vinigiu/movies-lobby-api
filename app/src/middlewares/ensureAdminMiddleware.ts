import { Request, Response, NextFunction } from "express";
import AppError from "../libs/errors/AppError";
import { UserModel, IUser } from "../libs/mongoose/models/UserModel";

const ensureAdminMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = request.user?.id;

    if (!userId) {
      throw new AppError("User not authenticated.", 401);
    }

    const user: IUser | null = await UserModel.findById(userId).exec();

    if (!user || !user.isAdmin) {
      throw new AppError("Only admin users are allowed to do this action", 403);
    }

    next();
  } catch (error) {
    response.status((error as AppError).statusCode || 500).json({ error: (error as AppError).message });
  }
};

export default ensureAdminMiddleware;
