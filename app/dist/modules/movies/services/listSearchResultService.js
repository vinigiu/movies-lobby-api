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
exports.listSerchResultService = void 0;
const AppError_1 = __importDefault(require("../../../libs/errors/AppError"));
const MovieModel_1 = require("../../../libs/mongoose/models/MovieModel");
exports.listSerchResultService = {
    execute: (params) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = {
                $or: [
                    { title: { $regex: new RegExp(params.q, "i") } },
                    { genre: { $regex: new RegExp(params.q, "i") } },
                ],
            };
            const movies = yield MovieModel_1.MovieModel.find(query).exec();
            return movies;
        }
        catch (error) {
            throw new AppError_1.default(error.message, 500);
        }
    }),
};
