import AppServer from '../server/app-server';

class App {
  server: AppServer;

  constructor() {
    this.server = new AppServer();
  }

  public async bootstrap(): Promise<void> {
    this.server.start();
  }
}

export default App;
