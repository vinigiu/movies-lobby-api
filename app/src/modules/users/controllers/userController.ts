import { Request, Response } from "express";
import { loginUserService } from "../services/loginUserService";
import { createUserService } from "../services/createUserService";
import AppError from "../../../libs/errors/AppError";

export const userController = {
  login: async (request: Request, response: Response): Promise<Response> => {
    try {
      const { username, password } = request.body;

      const token = await loginUserService.execute(username, password);

      return response.status(200).json({ token });
    } catch (error) {
      return response
        .status((error as AppError).statusCode || 500)
        .json({ error: (error as AppError).message });
    }
  },

  register: async (request: Request, response: Response): Promise<Response> => {
    try {
      const { username, email, password, isAdmin } = request.body;

      const newUser = await createUserService.execute({
        username,
        email,
        password,
        isAdmin,
      });

      return response.status(200).json({ user: newUser });
    } catch (error) {
      return response
        .status((error as AppError).statusCode || 500)
        .json({ error: (error as AppError).message });
    }
  },
};
