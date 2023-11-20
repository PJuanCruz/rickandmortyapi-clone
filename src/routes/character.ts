import ExpressRouter from './express-router';

class CharacterRouter extends ExpressRouter {
  // controller: AppController

  constructor() {
    super();
    // this.controller
    this.init();
  }

  init(): void {
    this.router.get('/', (req, res) => {
      res.json({ route: 'character' });
    });
  }
}

export default CharacterRouter;
