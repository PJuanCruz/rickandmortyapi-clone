import express, { Express, Request, Response } from 'express';
import { ENV } from '../config';
import AppRouter from '../routes/app-router';

class AppServer {
  private app: Express;
  private router: AppRouter;
  readonly PORT: string;
  readonly PREFIX: string;
  readonly DEV_MODE: boolean;

  constructor() {
    this.app = express();
    this.router = new AppRouter();
    this.PORT = process.env.PORT!;
    this.PREFIX = process.env.PREFIX!;
    this.DEV_MODE = ENV === 'development';
    this.configMiddlewares();
    this.configRoutes();
  }

  private configMiddlewares(): void {
    if (this.DEV_MODE) {
      this.app.use(require('morgan')('dev'));
    }
  }

  private configRoutes(): void {
    this.app.use(`/${this.PREFIX}`, this.router.getRouter());
  }

  start(): void {
    try {
      this.app.listen(this.PORT, () => {
        if (this.DEV_MODE) {
          console.log(`✔ Server is running on http://127.0.0.1:${this.PORT}/`);
        }
      });
    } catch (error) {
      if (this.DEV_MODE) {
        console.log('✖ Server is not running:\n', error);
      }
      process.exit(1);
    }
  }
}

export default AppServer;
