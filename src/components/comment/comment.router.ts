import { Router } from "express";
import { ComponentRouterOptions } from '../../shared/ComponentRouterOptions';
import { CommentController } from "./comment.controller";

export function MovieRouter(options: ComponentRouterOptions<CommentController>): Router {
    const { controller } = options;
    const router = Router();

    router.route('/')
        .get(controller.fetchComments);

    return router;
}
