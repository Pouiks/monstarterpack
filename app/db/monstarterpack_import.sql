BEGIN;

DROP TABLE IF EXISTS "user" , "categorie", "theme", "article";

CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user'
);

CREATE TABLE "categorie" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
);

CREATE TABLE "theme" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
);

CREATE TABLE "article" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "is_online" BOOLEAN NOT NULL DEFAULT FALSE,
    "author" TEXT NOT NULL DEFAULT "Votre admin dévoué",
    "like" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "comment" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" INT REFERENCES "user"(id),
    "article_id" INT REFERENCES "article"(id),
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "article_have_comments" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "article_id" INT REFERENCES "article"(id),
    "comment_id" INT REFERENCES "comment"(id)
);

CREATE TABLE "user_wrote_comments" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INT REFERENCES "user"(id),
    "comment_id" INT REFERENCES "comment"(id)
);

INSERT INTO "categorie" ("name") VALUES ('Voyage');

INSERT INTO
    "user" ("name", "email", "password", "role")
VALUES
    (
        'admin',
        'virgilejoinville@gmail.com',
        '$2a$04$AyaULLN1uZxgKr4jnTZJ4OaXePUjU1n228GBQoRZ29h3GSHhBnHpO',
        'admin'
    );

COMMIT;