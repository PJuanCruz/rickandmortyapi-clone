import express, { Express } from 'express';
import { srvConfig } from '../config/config';
import CharacterRouter from '../routes/character-router';
import HttpResponse from '../utils/http-response';

class AppServer {
  private app: Express;
  readonly PORT: string;
  readonly PREFIX: string;
  readonly DEV_MODE: boolean;

  constructor() {
    this.app = express();
    this.PORT = srvConfig.PORT;
    this.PREFIX = srvConfig.PREFIX;
    this.DEV_MODE = srvConfig.MODE === 'development';

    this.configMiddlewares();
    this.configRoutes();
    this.configEndwares();
  }

  private configMiddlewares(): void {
    if (this.DEV_MODE) {
      this.app.use(require('morgan')('dev'));
    }
  }

  private configRoutes(): void {
    this.app.use(`/${this.PREFIX}`, [new CharacterRouter().router]); // TODO
  }

  private configEndwares(): void {
    this.app.use(HttpResponse.NotFound);
    this.app.use(HttpResponse.internalServerError);
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
