import { Request, Response } from "express";
import { movieController } from "../../../modules/movies/controllers/movieController";
import { createMovieService } from "../../../modules/movies/services/createMovieService";
import { deleteMovieService } from "../../../modules/movies/services/deleteMovieService";
import { listMoviesService } from "../../../modules/movies/services/listMoviesService";
import { listSerchResultService } from "../../../modules/movies/services/listSearchResultService";
import { updateMovieService } from "../../../modules/movies/services/updateMovieService";
import AppError from "../../../libs/errors/AppError";

jest.mock('../../../modules/movies/services/createMovieService');
jest.mock('../../../modules/movies/services/listMoviesService');
jest.mock('../../../modules/movies/services/listSearchResultService');
jest.mock('../../../modules/movies/services/updateMovieService');
jest.mock('../../../modules/movies/services/deleteMovieService');
describe("Movie Controller", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    });

    // listMovies
    it('listMovies should return movies list successfully', async () => {
        const mockMoviesList = [{ title: 'Movie 1' }, { title: 'Movie 2' }];

        (listMoviesService.execute as jest.Mock).mockResolvedValueOnce(mockMoviesList);
    
        await movieController.listMovies({} as Request, mockResponse as Response);
    
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({ moviesList: mockMoviesList });
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
    });

    it('listMovies should return 500 status and error', async () => {
        mockRequest = {};

        const mockError = new AppError('An error occurred', 500);

        (listMoviesService.execute as jest.Mock).mockRejectedValueOnce(mockError);

        await movieController.listMovies(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'An error occurred' });
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
    });

    // listSearchResult
    it('listSearchResult should return movies list successfully', async () => {
        mockRequest = {
            query: {
                q: 'Movie',
            },
        };

        const mockMoviesList = [{ title: 'Movie 1' }, { title: 'Movie 2' }];

        (listSerchResultService.execute as jest.Mock).mockResolvedValueOnce(mockMoviesList);

        await movieController.listSearchResult(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({ moviesList: mockMoviesList });
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
    });

    it('listSearchResult should return 400 status and error', async () => {
        mockRequest = {
            query: {
                q: undefined,
            },
        };

        const mockMoviesList = [{ title: 'Movie 1' }, { title: 'Movie 2' }];

        (listSerchResultService.execute as jest.Mock).mockResolvedValueOnce(mockMoviesList);

        await movieController.listSearchResult(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: "You need to send a parameter for searching." });
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
    });

    it('listSearchResult should return 500 status and error', async () => {
        mockRequest = {
            query: {
                q: 'Movie',
            },
        };

        const mockError = new AppError('An error occurred', 500);

        (listMoviesService.execute as jest.Mock).mockRejectedValueOnce(mockError);

        await movieController.listMovies(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'An error occurred' });
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
    });

    it("deleteMovie should return deleted movie successfully", async () => {
        mockRequest = {
            params: {
                id: 'ldkfjsodiosh',
            },
        };

        const mockDeletedMovie = {
            id: 'ldkfjsodiosh',
            title: 'Movie 1',
            genre: 'Action',
            rating: '5',
            streamingLink: 'https://test.com'
        };

        (deleteMovieService.execute as jest.Mock).mockResolvedValueOnce(mockDeletedMovie);

        await movieController.deleteMovie(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({ deletedMovie: mockDeletedMovie });
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
    });

    it("deleteMovie should return 400 status and error", async () => {
        mockRequest = {
            params: {
                id: 'mockMovieId',
            },
        };

        (deleteMovieService.execute as jest.Mock).mockRejectedValueOnce({
            statusCode: 400,
            message: 'Movie not found.',
        });

        await movieController.deleteMovie(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Movie not found.' });
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
    });

    it("deleteMovie should return 500 status and error", async () => {
        mockRequest = {
            params: {
                id: 'ldkfjsodiosh',
            },
        };

        const mockError = new AppError('An error occurred', 500);

        (deleteMovieService.execute as jest.Mock).mockRejectedValueOnce(mockError);

        await movieController.deleteMovie(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'An error occurred' });
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
    });
});