import AppError from "../../../libs/errors/AppError";
import { MovieModel, IMovie } from "../../../libs/mongoose/models/MovieModel";

interface SearchMoviesParams {
  q: string;
}

export const listSerchResultService = {
  execute: async (params: SearchMoviesParams): Promise<IMovie[]> => {
    try {
      const query = {
        $or: [
          { title: { $regex: new RegExp(params.q, "i") } },
          { genre: { $regex: new RegExp(params.q, "i") } },
        ],
      };

      const movies = await MovieModel.find(query).exec();

      return movies;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  },
};
