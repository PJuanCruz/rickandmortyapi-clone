import * as fs from 'fs';
import * as path from 'path';
import { Client, Pool, QueryResult } from 'pg';
import { dbConfig } from '../config/config';
import AppError from '../utils/app-error';

export enum ClientType {
  Client = 'client',
  Pool = 'pool',
}

export enum SQL {
  MigrationsUp = 'migrations-up',
  MigrationsDown = 'migrations-down',
}

class AppDatabase {
  private readonly USER: string;
  private readonly HOST: string;
  private readonly DATABASE: string;
  private readonly PASSWORD: string;
  private readonly PORT: string;
  private readonly DEV_MODE: boolean;
  private readonly ADMIN_PORT: string;
  private client: Client | Pool | null;

  constructor() {
    this.USER = dbConfig.USER;
    this.HOST = dbConfig.HOST;
    this.DATABASE = dbConfig.DATABASE;
    this.PASSWORD = dbConfig.PASSWORD;
    this.PORT = dbConfig.PORT;
    this.DEV_MODE = dbConfig.MODE === 'development';
    this.ADMIN_PORT = dbConfig.ADMIN_PORT;

    this.client = null;
  }

  public async connect(client: ClientType): Promise<void> {
    if (!this.client) {
      const clientConfig = {
        user: this.USER,
        host: this.HOST,
        database: this.DATABASE,
        password: this.PASSWORD,
        port: Number(this.PORT),
      };

      const clientType = {
        client: () => new Client(clientConfig),
        pool: () => new Pool(clientConfig),
      };

      this.client = clientType[client]();
    }

    try {
      await this.client.connect();
      if (this.DEV_MODE) {
        const results = await this.client.query('SELECT NOW()');
        console.log(`✔ SELECT NOW(): ${results.rows[0].now}`);
        if (client === 'pool')
          console.log(
            `✔ Database Manager is running on http://127.0.0.1:${this.ADMIN_PORT}/`
          );
      }
      return;
    } catch (error) {
      if (this.DEV_MODE) {
        console.log('✖ Database is not connected:\n', error);
      }
      process.exit(1);
    }
  }

  public async end(): Promise<void> {
    if (!this.client) {
      return;
    }
    try {
      return await this.client.end();
    } catch (error) {
      if (this.DEV_MODE) {
        console.log(error);
      }
      process.exit(1);
    }
  }

  public async sqlQuery(file: SQL, params?: string[]) {
    try {
      if (!this.client) {
        throw new AppError({ message: '✖ Database is not connected:\n' });
      }
      const sql = await this.getSql(file);
      const results = await this.client.query(sql, params);

      return results;
    } catch (error) {
      if (this.DEV_MODE) {
        console.log(error);
      }
    }
  }

  private async getSql(file: SQL): Promise<string> {
    const sql = await fs.promises.readFile(
      path.join(__dirname, 'sql', `${file}.sql`),
      'utf8'
    );

    return sql;
  }
}

export default AppDatabase;
