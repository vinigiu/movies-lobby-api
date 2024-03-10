import AppError from '../../../libs/errors/AppError';
import { MovieModel } from '../../../libs/mongoose/models/MovieModel';

export const deleteMovieService = {
    execute: async (movieId: string): Promise<void> => {
        try {
          const deletedMovie = await MovieModel.findByIdAndDelete(movieId);

          if (!deletedMovie) {
            throw new AppError('Movie not found.', 400);
          }
        } catch (error) {
          throw new AppError((error as Error).message, 500);
        }
    },
}