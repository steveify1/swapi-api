import { delay, inject, injectable } from 'tsyringe';
import { ServiceMethodOptions } from '../../shared/ServiceMethodOptions';
import { SwapiService } from '../../shared/swapiService';

@injectable()
export class CharacterService {
    constructor(
        @inject(delay(() => SwapiService)) 
        private readonly swapiService: SwapiService,
    ) {}

    private filterByGender(characters: any[], gender: string): any[] {
        gender = gender.toLowerCase();
        return characters.filter(character => character.gender === gender);
    }

    private generateHeightMetadata(characters: any[]) {
        return {
            cm: 1000,
            in: 30,
            ft: 3,
        }
    }

    private generateMetaData(characters: any[]) {
        return {
            count: characters.length,
            height: this.generateHeightMetadata(characters),
        };
    }

    /**
     * Gets the people list from the star wars API
     * 
     * @param options - Service method options
     */
    async fetchAll(options: ServiceMethodOptions): Promise<any> {
        const { query } = options;

        let characters = await this.swapiService.fetchCharacters();
        
        if (query.gender) {
            characters = this.filterByGender(characters, query.gender);
        }
        
        const metadata = this.generateMetaData(characters);

        return { characters, metadata };
    }
}
