import { injectable } from 'tsyringe';
import { FindConditions } from 'typeorm';
import { Comment } from '../../database/entities/comment';
import { BadRequestError } from '../../errors';
import { CommentFilterInput, CreateCommentInput } from './comment.input';

@injectable()
export class CommentService {
    private commentModel: typeof Comment;

    constructor() {
        this.commentModel = Comment;
    }

    /**
     * Creates a new comment
     * 
     * @param input - An object containing the data required for creating a new comment
     */
    async create(input: CreateCommentInput): Promise<Comment> {
        if (!input.body) throw new BadRequestError('Comment cannot be empty');

        if (input.body.length > 500) throw new BadRequestError('Comment must not exceed 500 characters');

        const comment = this.commentModel.create({
            ...input,
            createdAt: new Date().toUTCString(),
            updatedAt: new Date().toUTCString(),
        });
        return comment.save();
    }

    buildFilters(filters: FindConditions<Comment>): FindConditions<Comment> {
        const conditions = {};

        if (filters.movieEpisodeId) {
            conditions['movieEpisodeId'] = filters.movieEpisodeId
        }

        return conditions;
    }

    async fetchAll(filters?: FindConditions<Comment>): Promise<Comment[]> {
        const findConditions = this.buildFilters(filters);
        const comments = await this.commentModel.find({
            where: findConditions,
            order: {
                createdAt: 'DESC',
            }
        });

        return comments.map(comment => {
            return Object.assign(comment, {
                createdAt: new Date(comment.createdAt).toUTCString(),
                updatedAt: new Date(comment.updatedAt).toUTCString(),
            });
        })
    }

    /**
     * Gets the number of comments asscoiated to a given episode
     * 
     * @param { string } episodeId - The ID of a star wars moive episode
     */
    async fetchCountByEpisode(episodeId: string): Promise<number> {
        return this.commentModel.count({
            where: { movieEpisodeId: episodeId },
        });
    }
}
