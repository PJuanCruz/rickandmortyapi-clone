import { NextFunction, Request, Response } from 'express';
import CharacterController from '../controllers/character-controller';
import AppRouter from './app-router';

class CharacterRouter extends AppRouter<CharacterController> {
  constructor() {
    super(CharacterController);
  }

  initRoutes() {
    this.router.get(
      '/character',
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.getAllCharacters(req, res, next)
    );
  }
}

export default CharacterRouter;
