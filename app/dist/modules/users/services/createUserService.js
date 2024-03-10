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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = void 0;
const UserModel_1 = require("../../../libs/mongoose/models/UserModel");
const AppError_1 = __importDefault(require("../../../libs/errors/AppError"));
exports.createUserService = {
    execute: (params) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!params.username || !params.email || !params.password) {
                throw new AppError_1.default("Username, email, and password are required fields.", 400);
            }
            const existingUser = yield UserModel_1.UserModel.findOne({
                $or: [{ username: params.username }, { email: params.email }],
            }).exec();
            if (existingUser) {
                throw new AppError_1.default("Username or email already exists.", 400);
            }
            const newUser = yield UserModel_1.UserModel.create({
                username: params.username,
                email: params.email,
                password: params.password,
                isAdmin: params.isAdmin || false,
            });
            return newUser;
        }
        catch (error) {
            throw new AppError_1.default(error.message, 500);
        }
    }),
};
