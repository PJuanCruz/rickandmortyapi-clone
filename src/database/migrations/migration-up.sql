CREATE TYPE "characters_status" AS ENUM ('Alive', 'Dead', 'unknown');
CREATE TYPE "characters_gender" AS ENUM (
  'Female',
  'Male',
  'Genderless',
  'unknown'
);
CREATE TABLE "characters" (
  "id" integer PRIMARY KEY,
  "name" varchar(255) UNIQUE NOT NULL,
  "status" characters_status,
  "species" varchar(255),
  "type" varchar(255),
  "gender" characters_gender,
  "origin" integer,
  "location" integer,
  "image" varchar(2048),
  "url" varchar(2048),
  "created" timestamp
);
CREATE TABLE "locations" (
  "id" integer PRIMARY KEY,
  "name" varchar(255) UNIQUE NOT NULL,
  "type" varchar(255),
  "dimension" varchar(255),
  "url" varchar(2048),
  "created" timestamp
);
CREATE TABLE "episodes" (
  "id" integer PRIMARY KEY,
  "name" varchar(255) UNIQUE NOT NULL,
  "air_date" varchar(255),
  "episode" varchar(255),
  "url" varchar(2048),
  "created" timestamp
);
CREATE TABLE "characters_episodes" (
  "character_id" integer,
  "episode_id" integer,
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY
);
ALTER TABLE "characters"
ADD FOREIGN KEY ("origin") REFERENCES "locations" ("id");
ALTER TABLE "characters"
ADD FOREIGN KEY ("location") REFERENCES "locations" ("id");
ALTER TABLE "characters_episodes"
ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");
ALTER TABLE "characters_episodes"
ADD FOREIGN KEY ("episode_id") REFERENCES "episodes" ("id");