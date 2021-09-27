import { delay, inject, injectable } from 'tsyringe';
import { SwapiService } from '../../shared/swapiService';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../../database/entities/comment';
import { CreateMovieCommentInput } from './movie.input';
import { ServiceMethodOptions } from '../../shared/ServiceMethodOptions';
import { NotFoundError } from '../../errors';

@injectable()
export class MovieService {
    constructor(
        @inject(delay(() => SwapiService)) 
        private readonly swapiService: SwapiService,
        @inject(delay(() => CommentService)) 
        private readonly commentService: CommentService,
    ) {}

    private filterByDate(movies: any[]): any[] {
        return movies.sort((a, b) => {
            const aTimestamp = new Date(a.release_date).valueOf();
            const bTimestamp = new Date(b.release_date).valueOf();
            return aTimestamp - bTimestamp;
        });
    }

    async fetchAll(): Promise<any> {
        let movies = await this.swapiService.fetchMovies();
        movies = this.filterByDate(movies);
        movies = await Promise.all(movies.map(async movie => {
            const commentCount = await this.commentService.fetchCountByEpisode(movie.episode_id);

            return {
                title: movie.title,
                episode_id: movie.episode_id,
                opening_crawl: movie.opening_crawl,
                director: movie.director,
                producer: movie.producer,
                release_date: movie.release_date,
                created: movie.created,
                edited: movie.edited,
                commentCount,
            }
        }));

        return movies;
    }

    /**
     * Fetches a single episode
     * 
     * @param { string } episodeId - The episode ID of a movie
     */
     async fetchMovie(episodeId: string): Promise<any> {
        return this.swapiService.fetchMovie(episodeId);
    }

    /**
     * Adds a new comment for a specified movie episode
     * 
     * @param { string } episodeId - The episode ID of a movie
     */
     async addMovieComment(episodeId: string, input: CreateMovieCommentInput, options: ServiceMethodOptions): Promise<Comment> {
        const movies = await this.swapiService.fetchMovies();

        const movieExists = movies.filter(movie => movie.episode_id == episodeId)[0];
        if (!movieExists) throw new NotFoundError('The episode you specified does not exist');

        return this.commentService.create({
            ...input,
            movieEpisodeId: episodeId,
            author: options.currentUser,
        });
    }

    /**
     * Fetches all comments associated with a movie
     * 
     * @param { string } episodeId - The episode ID of a movie
     */
    async fetchComments(episodeId: string): Promise<Comment[]> {
        return this.commentService.fetchAll({ movieEpisodeId: episodeId });
    }
}
