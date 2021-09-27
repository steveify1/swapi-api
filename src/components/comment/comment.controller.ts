import { NextFunction, Request, RequestHandler, Response } from "express";
import { CommentService } from "./comment.service";

export interface CommentController {
    fetchComments: RequestHandler;
}

export const CommentControllerFactory = (commentService: CommentService): CommentController => {

    return {
        async fetchComments(req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                const comments = await commentService.fetchAll();
                res.status(200).json({
                    status: 'success',
                    message: 'Query successful',
                    data: comments,
                });
            } catch (error) {
                next(error);
            }
        }
    }
}