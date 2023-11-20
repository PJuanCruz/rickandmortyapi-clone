import { Pool } from 'pg';
import { dbConfig } from '../config/config';

class AppDatabase {
  private readonly USER: string;
  private readonly HOST: string;
  private readonly DATABASE: string;
  private readonly PASSWORD: string;
  private readonly PORT: string;
  readonly DEV_MODE: boolean;
  private readonly ADMIN_PORT: string;
  private pool: Pool;

  constructor() {
    this.USER = dbConfig.USER;
    this.HOST = dbConfig.HOST;
    this.DATABASE = dbConfig.DATABASE;
    this.PASSWORD = dbConfig.PASSWORD;
    this.PORT = dbConfig.PORT;
    this.DEV_MODE = dbConfig.MODE === 'development';
    this.ADMIN_PORT = dbConfig.ADMIN_PORT;

    this.pool = new Pool({
      user: this.USER,
      host: this.HOST,
      database: this.DATABASE,
      password: this.PASSWORD,
      port: parseInt(this.PORT),
    });
  }

  async connect() {
    try {
      await this.pool.connect();
      await this.pool.query('SELECT NOW()');
      if (this.DEV_MODE) {
        console.log(
          `✔ Database Manager is running on http://127.0.0.1:${this.ADMIN_PORT}/`
        );
      }
    } catch (error) {
      if (this.DEV_MODE) {
        console.log('✖ Database is not connected:\n', error);
      }
      process.exit(1);
    }
  }

  async query(query: string, values?: any[]) {
    try {
      return await this.pool.query(query, values);
    } catch (error) {
      if (this.DEV_MODE) {
        console.log(error);
      }
    }
  }
}

export default AppDatabase;
