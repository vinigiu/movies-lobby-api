import { Router } from "express";
import authMiddleware from "../../../middlewares/authMiddleware";
import ensureAdminMiddleware from "../../../middlewares/ensureAdminMiddleware";
import { movieController } from "../controllers/movieController"; 

const moviesRouter = Router();

moviesRouter.get('/movies', authMiddleware, movieController.listMovies);
moviesRouter.get('/search', authMiddleware, movieController.listSearchResult);

moviesRouter.post('/movies', authMiddleware, movieController.createMovie);

moviesRouter.put('/movies/:id', authMiddleware, ensureAdminMiddleware, movieController.updateMovie);

moviesRouter.delete('/movies/:id', authMiddleware, ensureAdminMiddleware, movieController.deleteMovie);

export { moviesRouter };