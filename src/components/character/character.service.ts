import { delay, inject, injectable } from 'tsyringe';
import { ServiceMethodOptions } from '../../shared/ServiceMethodOptions';
import { SwapiService } from '../../shared/swapiService';
import { Character } from './character.interface';

@injectable()
export class CharacterService {
    constructor(
        @inject(delay(() => SwapiService)) 
        private readonly swapiService: SwapiService,
    ) {}

    private filterByGender(characters: Character[], gender: string): Character[] {
        gender = gender.toLowerCase();
        return characters.filter(character => character.gender === gender);
    }

    private generateHeightMetadata(characters: Character[]) {
        const totalHeightInCentimeters = characters.reduce((prevValue: number, currentCharacter) => {
            return prevValue + currentCharacter.height;
        }, 0);

        return {
            centimeters: totalHeightInCentimeters,
            inches: Number((totalHeightInCentimeters / 2.54).toFixed(2)),
            feet: Number((totalHeightInCentimeters / 30.48).toFixed(2)),
        }
    }

    private generateMetaData(characters: Character[]) {
        return {
            count: characters.length,
            totalHeight: this.generateHeightMetadata(characters),
        };
    }

    /**
     * Sorts the characters by any key with a primitive value either in
     * ascending or descending order.
     * 
     * @param { Character[] } characters - The character list
     * @param { string } sortKey - The sorting key.
     */
    sort(characters: Character[], sortKey: string): Character[] {
        const useDescendingOrder = sortKey[0] === '-';
        
        if (useDescendingOrder) {
            sortKey = sortKey.slice(1);
        }

        return characters.sort((a, b) => {
            const valueInA = a[sortKey];
            const valueInB = b[sortKey];
            let result: number;
            
            if (!valueInA) {
                result = -1;
            }

            if (!valueInB) {
                result = 1;
            }

            if (!result) {
                if (valueInA > valueInB) {
                    result = 1;
                } else if (valueInA < valueInB) {
                    result = -1;
                } else {
                    result = 0;
                }
            }
            
            return useDescendingOrder ? (result * -1) : result;
        });
    }

    /**
     * Normalizes the character list by:
     *  - converting the `height` and `mass` properties of each character to a Number
     * 
     * @param { Character[] } characters - The character list
     * @returns 
     */
    normalize(characters: Character[]): Character[] {
        return characters.map(character => {
            return {
                ...character,
                height: Number(character.height),
                mass: Number(character.mass),
            };
        });
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

        characters = this.normalize(characters);
        
        if (query.sort) {
            characters = this.sort(characters, query.sort);
        }

        const metadata = this.generateMetaData(characters);

        return { metadata, characters };
    }
}
