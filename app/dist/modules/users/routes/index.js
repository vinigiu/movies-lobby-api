"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
usersRouter.post('/register', userController_1.userController.register);
usersRouter.post('/login', userController_1.userController.login);
