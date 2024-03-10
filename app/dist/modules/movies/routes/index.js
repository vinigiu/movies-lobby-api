"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../../middlewares/authMiddleware"));
const ensureAdminMiddleware_1 = __importDefault(require("../../../middlewares/ensureAdminMiddleware"));
const movieController_1 = require("../controllers/movieController");
const moviesRouter = (0, express_1.Router)();
exports.moviesRouter = moviesRouter;
moviesRouter.get('/movies', authMiddleware_1.default, movieController_1.movieController.listMovies);
moviesRouter.get('/search', authMiddleware_1.default, movieController_1.movieController.listSearchResult);
moviesRouter.post('/movies', authMiddleware_1.default, movieController_1.movieController.createMovie);
moviesRouter.put('/movies/:id', authMiddleware_1.default, ensureAdminMiddleware_1.default, movieController_1.movieController.updateMovie);
moviesRouter.delete('/movies/:id', authMiddleware_1.default, ensureAdminMiddleware_1.default, movieController_1.movieController.deleteMovie);
