import { Router } from "express";
import { ComponentRouterOptions } from '../../shared/ComponentRouterOptions';
import { MovieController } from "./movie.controller";

export function MovieRouter(options: ComponentRouterOptions<MovieController>): Router {
    const { controller } = options;
    const router = Router();

    router.route('/')
        .get(controller.fetchMovies);

    router.route('/:episodeId')
        .get(controller.fetchMovie);
    
    router.route('/:episodeId/comments')
        .post(controller.addMovieComment)
        .get(controller.fetchMovieComments);

    return router;
}
