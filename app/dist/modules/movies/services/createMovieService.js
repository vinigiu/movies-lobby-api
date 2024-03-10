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
exports.createMovieService = void 0;
const AppError_1 = __importDefault(require("../../../libs/errors/AppError"));
const MovieModel_1 = require("../../../libs/mongoose/models/MovieModel");
exports.createMovieService = {
    execute: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!Object.values(MovieModel_1.Genre).includes(data.genre)) {
                throw new AppError_1.default('Invalid data for Genre', 500);
            }
            if (!Object.values(MovieModel_1.Rating).includes(data.rating)) {
                throw new AppError_1.default('Invalid data for Rating', 500);
            }
            const newMovie = yield MovieModel_1.MovieModel.create(data);
            return newMovie;
        }
        catch (error) {
            throw new AppError_1.default(error.message, 500);
        }
    }),
};
