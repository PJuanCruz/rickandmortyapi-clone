import { NextFunction, Request, Response } from 'express';
import CharacterService from '../services/character-service';
import AppController from './app-controller';

class CharacterController extends AppController<CharacterService> {
  constructor() {
    super(CharacterService);
  }

  getAllCharacters = this.asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const character = await this.service.getAllCharacters();
      return res.json(character);
    }
  ); // TODO
}

export default CharacterController;
