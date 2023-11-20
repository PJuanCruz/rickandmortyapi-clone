export const ENV = process.env.NODE_ENV!;

export const srvConfig = {
  PORT: process.env.PORT!,
  PREFIX: process.env.PREFIX!,
  MODE: process.env.NODE_ENV!,
};

export const dbConfig = {
  PORT: process.env.PG_PORT!,
  HOST: process.env.PG_HOST!,
  PASSWORD: process.env.PG_PASSWORD!,
  USER: process.env.PG_USER!,
  DATABASE: process.env.PG_DATABASE!,
  MODE: process.env.NODE_ENV!,
  ADMIN_PORT: process.env.PGADMIN_PORT!,
};
