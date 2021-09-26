import { NextFunction, Request, RequestHandler, Response } from "express";
import { MovieService } from "./movie.service";

export interface MovieController {
    fetchMovies: RequestHandler;
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
        }
    }
}