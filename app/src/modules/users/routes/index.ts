import { Router } from "express";
import { userController } from "../controllers/userController";

const usersRouter = Router();

usersRouter.post('/register', userController.register);
usersRouter.post('/login', userController.login);

export { usersRouter };