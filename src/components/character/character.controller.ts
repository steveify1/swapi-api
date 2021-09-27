import { NextFunction, Request, RequestHandler, Response } from "express";
import { CharacterService } from "./character.service";

export interface CharacterController {
    fetchCharacters: RequestHandler;
}

export const CharacterControllerFactory = (characterService: CharacterService): CharacterController => {

    return {
        async fetchCharacters(req: Request, res: Response, next: NextFunction): Promise<void> {
            const { query } = req;
            try {
                const characters = await characterService.fetchAll({ query });
                res.status(200).json({
                    status: 'success',
                    message: 'Query successful',
                    data: characters,
                });
            } catch (error) {
                next(error);
            }
        }
    }
}