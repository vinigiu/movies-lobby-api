import AppError from '../../../libs/errors/AppError';
import { MovieModel, IMovie, Genre, Rating } from '../../../libs/mongoose/models/MovieModel';

interface UpdateMovieData {
  title?: string; 
  genre?: Genre;
  rating?: Rating;
  streamingLink?: string;
}

export const updateMovieService = {
    execute: async (movieId: string, updatedMovieData: UpdateMovieData): Promise<IMovie> => {
        try {
            const existingMovie = await MovieModel.findById(movieId);
      
            if (!existingMovie) {
                throw new AppError('Movie not found.', 400);
            }

            if (updatedMovieData.genre && !Object.values(Genre).includes(updatedMovieData.genre)) {
                throw new AppError('Invalid data for Genre', 400);
            }

            if (updatedMovieData.rating && !Object.values(Rating).includes(updatedMovieData.rating)) {
                throw new AppError('Invalid data for Rating', 400);
            }
      
            existingMovie.set(updatedMovieData);
      
            const updatedMovie = await existingMovie.save();
      
            return updatedMovie;
          } catch (error) {
            throw new AppError((error as Error).message, 500);
          }
    },
}
