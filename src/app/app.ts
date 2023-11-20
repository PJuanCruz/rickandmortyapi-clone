import AppDatabase from '../database/app-database';
import AppServer from '../server/app-server';

class App {
  private database: AppDatabase;
  private server: AppServer;

  constructor() {
    this.database = new AppDatabase();
    this.server = new AppServer();
  }

  public async bootstrap(): Promise<void> {
    await this.database.connect();
    this.server.start();
  }
}

export default App;
