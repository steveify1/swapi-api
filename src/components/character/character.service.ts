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
        const totalHeightInCentimeters = characters.reduce((prevValue: number, currentCharacter) => {
            return prevValue + parseFloat(currentCharacter.height);
        }, 0);

        return {
            centimeters: totalHeightInCentimeters,
            inches: Number((totalHeightInCentimeters / 2.54).toFixed(2)),
            feet: Number((totalHeightInCentimeters / 30.48).toFixed(2)),
        }
    }

    private generateMetaData(characters: any[]) {
        return {
            count: characters.length,
            totalHeight: this.generateHeightMetadata(characters),
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

        return { metadata, characters };
    }
}
