import AppDatabase from '../database/app-database';

class AppService {
  protected db: AppDatabase;

  constructor() {
    this.db = new AppDatabase();
  }
}

export default AppService;
