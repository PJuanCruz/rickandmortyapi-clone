import express, { Router } from 'express';

class ExpressRouter {
  protected router: Router;

  constructor() {
    this.router = express.Router();
  }

  public getRouter(): express.Router {
    return this.router;
  }
}

export default ExpressRouter;
