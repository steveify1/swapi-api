import { NextFunction, Request, RequestHandler, Response } from "express";
import { MovieService } from "./movie.service";

export interface MovieController {
    fetchMovies: RequestHandler;
    fetchMovie: RequestHandler;
    fetchMovieComments: RequestHandler;
    addMovieComment: RequestHandler;
}

export const MovieControllerFactory = (movieService: MovieService): MovieController => {

    return {
        async fetchMovies(req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                const movies = await movieService.fetchAll();
                res.status(200).json({
                    status: 'success',
                    message: 'Query successful',
                    data: movies,
                });
            } catch (error) {
                next(error);
            }
        },

        async fetchMovie(req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                const movie = await movieService.fetchMovie(req.params.episodeId);

                res.status(200).json({
                    status: 'success',
                    message: 'Query successful',
                    data: movie,
                });
            } catch (error) {
                next(error);
            }
        },

        async fetchMovieComments(req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                const comments = await movieService.fetchComments(req.params.episodeId);
                res.status(200).json({
                    status: 'success',
                    message: 'Query successful',
                    data: comments,
                });
            } catch (error) {
                next(error);
            }
        },

        async addMovieComment(req: Request, res: Response, next: NextFunction): Promise<void> {
            const { params, body, socket } = req;

            try {
                const comment = await movieService.addMovieComment( params.episodeId, body, {
                    currentUser: socket.remoteAddress == '::1' ? '127.0.0.1' : socket.remoteAddress,
                });

                res.status(200).json({
                    status: 'success',
                    message: 'Query successful',
                    data: comment,
                });
            } catch (error) {
                next(error);
            }
        }
    }
}