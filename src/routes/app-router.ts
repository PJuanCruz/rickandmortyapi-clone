import express, { Express, Request, Response } from 'express';

import CharacterRouter from './character';
import ExpressRouter from './express-router';

class AppRouter extends ExpressRouter {
  characterRouter: ExpressRouter;

  constructor() {
    super();
    this.characterRouter = new CharacterRouter();
    this.init();
  }

  private init(): void {
    this.router.head('/', (req: Request, res: Response) => {
      return res.sendStatus(200);
    });

    this.router.use('/character', this.characterRouter.getRouter());
  }
}

export default AppRouter;
