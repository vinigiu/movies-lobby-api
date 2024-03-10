"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.loginUserService = void 0;
const AppError_1 = __importDefault(require("../../../libs/errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("../../../libs/mongoose/models/UserModel");
exports.loginUserService = {
    execute: (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield UserModel_1.UserModel.findOne({ username }).exec();
            if (!user) {
                throw new AppError_1.default("Invalid username.", 401);
            }
            const { compare } = yield Promise.resolve().then(() => __importStar(require('bcrypt-ts')));
            const isPasswordValid = yield compare(password, user.password);
            if (!isPasswordValid) {
                throw new AppError_1.default("Invalid password.", 401);
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id }, "your-secret-key", {
                expiresIn: "1h",
            });
            return token;
        }
        catch (error) {
            throw new AppError_1.default(error.message, 500);
        }
    }),
};
