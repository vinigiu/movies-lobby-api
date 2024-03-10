import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../libs/errors/AppError";
import { UserModel, IUser } from "../libs/mongoose/models/UserModel";

interface AuthenticatedRequest extends Request {
    user?: {
      id: string;
      email: string;
      username: string;
      isAdmin: boolean;
    };
}

const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = request.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new AppError("Token not provided.", 401);
    }

    const decoded: any = jwt.verify(token, "your-secret-key");

    const user: IUser | null = await UserModel.findById(decoded.id).exec();

    if (!user) {
      throw new AppError("User not found.", 401);
    }

    request.user = { 
        id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
    };

    next();
  } catch (error) {
    response.status((error as AppError).statusCode || 500).json({ error: (error as AppError).message });
  }
};

export default authMiddleware;
