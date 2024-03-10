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
exports.movieController = void 0;
const createMovieService_1 = require("../services/createMovieService");
const deleteMovieService_1 = require("../services/deleteMovieService");
const listMoviesService_1 = require("../services/listMoviesService");
const listSearchResultService_1 = require("../services/listSearchResultService");
const updateMovieService_1 = require("../services/updateMovieService");
exports.movieController = {
    listMovies: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const moviesList = yield listMoviesService_1.listMoviesService.execute();
            return response.status(200).json({ moviesList });
        }
        catch (error) {
            return response.status(error.statusCode || 500).json({ error: error.message });
        }
    }),
    listSearchResult: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = request.query.q;
            if (!query) {
                return response
                    .status(400)
                    .json({ error: "You need to send a parameter for searching." });
            }
            const moviesList = yield listSearchResultService_1.listSerchResultService.execute({
                q: String(query),
            });
            return response.status(200).json({ moviesList });
        }
        catch (error) {
            return response.status(error.statusCode || 500).json({ error: error.message });
        }
    }),
    createMovie: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, genre, rating, streamingLink } = request.body;
            if (!title || !genre || !rating || !streamingLink) {
                return response.status(400).json({ error: "All fields are required" });
            }
            const createdMovie = yield createMovieService_1.createMovieService.execute({
                title,
                genre,
                rating,
                streamingLink,
            });
            return response.status(200).json({ createdMovie });
        }
        catch (error) {
            return response.status(error.statusCode || 500).json({ error: error.message });
        }
    }),
    updateMovie: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const movieId = request.params.id;
            const updatedMovieData = request.body;
            const updatedMovie = yield updateMovieService_1.updateMovieService.execute(movieId, updatedMovieData);
            return response.status(200).json({ updatedMovie });
        }
        catch (error) {
            return response.status(error.statusCode || 500).json({ error: error.message });
        }
    }),
    deleteMovie: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const movieId = request.params.id;
            const deletedMovie = yield deleteMovieService_1.deleteMovieService.execute(movieId);
            return response.status(200).json({ deletedMovie });
        }
        catch (error) {
            return response.status(error.statusCode || 500).json({ error: error.message });
        }
    }),
};
