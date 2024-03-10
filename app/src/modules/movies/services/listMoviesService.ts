import AppError from '../../../libs/errors/AppError';
import { MovieModel, IMovie } from '../../../libs/mongoose/models/MovieModel';


export const listMoviesService = {
    execute: async (): Promise<IMovie[]> => {
        try {
          const movies = await MovieModel.find().exec();
    
          return movies;
        } catch (error) {
            throw new AppError((error as Error).message, 500);
        }
    },
}