"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const loginUserService_1 = require("../services/loginUserService");
const createUserService_1 = require("../services/createUserService");
exports.userController = {
    login: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password } = request.body;
            const token = yield loginUserService_1.loginUserService.execute(username, password);
            return response.status(200).json({ token });
        }
        catch (error) {
            return response
                .status(error.statusCode || 500)
                .json({ error: error.message });
        }
    }),
    register: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email, password, isAdmin } = request.body;
            const newUser = yield createUserService_1.createUserService.execute({
                username,
                email,
                password,
                isAdmin,
            });
            return response.status(200).json({ user: newUser });
        }
        catch (error) {
            return response
                .status(error.statusCode || 500)
                .json({ error: error.message });
        }
    }),
};
