import { delay, inject, injectable } from 'tsyringe';
import { SwapiService } from '../../shared/swapiService';

@injectable()
export class MovieService {
    constructor(
        @inject(delay(() => SwapiService)) 
        private readonly swapiService: SwapiService,
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
        movies = movies.map(movie => {
            return {
                title: movie.title,
                episode_id: movie.episode_id,
                opening_crawl: movie.opening_crawl,
                director: movie.director,
                producer: movie.producer,
                release_date: movie.release_date,
                created: movie.created,
                edited: movie.edited,
            }
        });

        return movies;
    }
}
