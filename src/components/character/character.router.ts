import { Router } from "express";
import { ComponentRouterOptions } from '../../shared/ComponentRouterOptions';
import { CharacterController } from "./character.controller";

export function CharacterRouter(options: ComponentRouterOptions<CharacterController>): Router {
    const { controller } = options;
    const router = Router();

    router.route('/')
        .get(controller.fetchCharacters);

    return router;
}
