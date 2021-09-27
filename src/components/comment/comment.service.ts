import { injectable } from 'tsyringe';
import { FindConditions } from 'typeorm';
import { Comment } from '../../database/entities/comment';
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
        return this.commentModel.find({ where: findConditions });
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
