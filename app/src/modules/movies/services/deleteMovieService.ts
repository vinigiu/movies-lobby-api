import AppError from '../../../libs/errors/AppError';
import { MovieModel, IMovie } from '../../../libs/mongoose/models/MovieModel';

export const deleteMovieService = {
    execute: async (movieId: string): Promise<IMovie>  => {
        try {
          const deletedMovie = await MovieModel.findByIdAndDelete(movieId);

          if (!deletedMovie) {
            throw new AppError('Movie not found.', 400);
          }

          return deletedMovie;
        } catch (error) {
          throw new AppError((error as Error).message, 500);
        }
    },
}