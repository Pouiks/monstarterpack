BEGIN;

DROP TABLE IF EXISTS "user" , "categorie", "theme", "article";

CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    PRIMARY KEY ("id")
);

CREATE TABLE "categorie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL
);

CREATE TABLE "theme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL    
);

CREATE TABLE "article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "is_online" BOOLEAN NOT NULL DEFAULT FALSE,
    "author" INTEGER REFERENCES "user"("id"),
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP NULL
);

COMMIT;