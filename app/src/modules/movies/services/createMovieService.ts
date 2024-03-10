import AppError from "../../../libs/errors/AppError";
import { MovieModel, IMovie, Genre, Rating } from '../../../libs/mongoose/models/MovieModel';

interface CreateMovieData {
  title: string;
  genre: Genre;
  rating: Rating;
  streamingLink: string;
}

export const createMovieService = {
    execute: async (data: CreateMovieData): Promise<IMovie> => {
        try {
          if (!Object.values(Genre).includes(data.genre)) {
            throw new AppError('Invalid data for Genre', 500);
          }

          if (!Object.values(Rating).includes(data.rating)) {
            throw new AppError('Invalid data for Rating', 500);
          }

          const query = {
            $or: [
              { title: data.title },
              { streamingLink: data.streamingLink },
            ],
          };

          const movieExists = await MovieModel.findOne(query).exec();

          if (movieExists) {
            throw new AppError('Movie already exists', 500);
          }

          const newMovie = await MovieModel.create(data);
    
          return newMovie;
        } catch (error) {
          throw new AppError((error as Error).message, 500);
        }
      },
}