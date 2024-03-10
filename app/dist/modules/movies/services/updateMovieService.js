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
exports.updateMovieService = void 0;
const AppError_1 = __importDefault(require("../../../libs/errors/AppError"));
const MovieModel_1 = require("../../../libs/mongoose/models/MovieModel");
exports.updateMovieService = {
    execute: (movieId, updatedMovieData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingMovie = yield MovieModel_1.MovieModel.findById(movieId);
            if (!existingMovie) {
                throw new AppError_1.default('Movie not found.', 400);
            }
            if (updatedMovieData.genre && !Object.values(MovieModel_1.Genre).includes(updatedMovieData.genre)) {
                throw new AppError_1.default('Invalid data for Genre', 400);
            }
            if (updatedMovieData.rating && !Object.values(MovieModel_1.Rating).includes(updatedMovieData.rating)) {
                throw new AppError_1.default('Invalid data for Rating', 400);
            }
            existingMovie.set(updatedMovieData);
            const updatedMovie = yield existingMovie.save();
            return updatedMovie;
        }
        catch (error) {
            throw new AppError_1.default(error.message, 500);
        }
    }),
};
