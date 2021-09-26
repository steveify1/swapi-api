import { container } from "tsyringe";
import { CharacterControllerFactory } from "./character.controller";
import { CharacterRouter } from "./character.router";
import { CharacterService } from "./character.service";

const characterService = container.resolve(CharacterService);
const characterController = CharacterControllerFactory(characterService);
export const characterRouter = CharacterRouter({ controller: characterController });