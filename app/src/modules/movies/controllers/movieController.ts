import { Request, Response } from "express";
import { createMovieService } from "../services/createMovieService";
import { deleteMovieService } from "../services/deleteMovieService";
import { listMoviesService } from "../services/listMoviesService";
import { listSerchResultService } from "../services/listSearchResultService";
import { updateMovieService } from "../services/updateMovieService";
import AppError from "../../../libs/errors/AppError";

export const movieController = {
  listMovies: async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      const moviesList = await listMoviesService.execute();

      return response.status(200).json({ moviesList });
    } catch (error) {
      return response.status((error as AppError).statusCode || 500).json({ error: (error as AppError).message });
    }
  },

  listSearchResult: async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      const query = request.query.q;

      if (!query) {
        return response
          .status(400)
          .json({ error: "You need to send a parameter for searching." });
      }

      const moviesList = await listSerchResultService.execute({
        q: String(query),
      });

      return response.status(200).json({ moviesList });
    } catch (error) {
      return response.status((error as AppError).statusCode || 500).json({ error: (error as AppError).message });
    }
  },

  createMovie: async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      const { title, genre, rating, streamingLink } = request.body;

      if (!title) {
        return response.status(400).json({ error: "Title field is required" });
      }

      if (!genre) {
        return response.status(400).json({ error: "Genre field is required" });
      }

      if (!rating) {
        return response.status(400).json({ error: "Rating field is required" });
      }

      if (!streamingLink) {
        return response.status(400).json({ error: "StreamingLink field is required" });
      }

      const createdMovie = await createMovieService.execute({
        title,
        genre,
        rating,
        streamingLink,
      });

      return response.status(200).json({ createdMovie });
    } catch (error) {
      return response.status((error as AppError).statusCode || 500).json({ error: (error as AppError).message });
    }
  },

  updateMovie: async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      const movieId = request.params.id;
      const updatedMovieData = request.body;
      const updatedMovie = await updateMovieService.execute(
        movieId,
        updatedMovieData
      );

      return response.status(200).json({ updatedMovie });
    } catch (error) {
      return response.status((error as AppError).statusCode || 500).json({ error: (error as AppError).message });
    }
  },

  deleteMovie: async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      const movieId = request.params.id;
      const deletedMovie = await deleteMovieService.execute(movieId);

      return response.status(200).json({ deletedMovie });
    } catch (error) {
      return response.status((error as AppError).statusCode || 500).json({ error: (error as AppError).message });
    }
  },
};
