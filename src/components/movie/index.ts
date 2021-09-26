import { container } from "tsyringe";
import { MovieControllerFactory } from "./movie.controller";
import { MovieRouter } from "./movie.router";
import { MovieService } from "./movie.service";

const movieService = container.resolve(MovieService);
const movieController = MovieControllerFactory(movieService);
export const movieRouter = MovieRouter({ controller: movieController });