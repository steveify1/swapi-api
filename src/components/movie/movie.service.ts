import { delay, inject, injectable } from 'tsyringe';
import { SwapiService } from '../../shared/swapiService';

@injectable()
export class MovieService {
    constructor(
        @inject(delay(() => SwapiService)) 
        private readonly swapiService: SwapiService,
    ) {}

    async fetchAll(): Promise<any> {
        const movies = await this.swapiService.fetchMovies();
        
        // TODO: Some formating

        return movies;
    }
}
