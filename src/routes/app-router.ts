import express, { Router } from 'express';

class AppRouter<T> {
  public router: Router;
  protected controller: T;

  constructor(TController: { new (): T }) {
    this.router = express.Router();
    this.controller = new TController();
    this.initRoutes();
  }

  initRoutes() {}
}

export default AppRouter;
