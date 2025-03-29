CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "email" varchar(255) UNIQUE NOT NULL,
  "password" varchar(255) NOT NULL,
  "photo" varchar(255),
  "purchased_products" int
);

CREATE TABLE "sellers" (
  "id" int PRIMARY KEY,
  "email" varchar(255) UNIQUE NOT NULL,
  "photo" varchar,
  "password" varchar NOT NULL,
  "sold_products" int,
  "rating_products" float,
  "time_sold" datetime
);

CREATE TABLE "products" (
  "code" int PRIMARY KEY,
  "name_product" varchar(255) NOT NULL,
  "description_product" varchar,
  "price_product" float NOT NULL,
  "discount_percentage" float,
  "category" varchar(255) NOT NULL,
  "tags" varchar(255),
  "stock" int NOT NULL,
  "reviews" int,
  "is_id_seller" int,
  "rating" float,
  "img_product" varchar(255) NOT NULL,
  "strars_products" float
);

CREATE TABLE "comments" (
  "id_comment" int PRIMARY KEY,
  "user_comment" int NOT NULL,
  "code_comment_product" int NOT NULL,
  "comment_text" varchar(255) NOT NULL,
  "likes" int,
  "dislikes" int
);

CREATE TABLE "message" (
  "code" int PRIMARY KEY,
  "body" varchar NOT NULL,
  "resive_message_id" int UNIQUE NOT NULL,
  "id_user_messages" int,
  "id_sellers_messages" int
);

ALTER TABLE "products" ADD FOREIGN KEY ("is_id_seller") REFERENCES "sellers" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("user_comment") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("code_comment_product") REFERENCES "products" ("code");

ALTER TABLE "message" ADD FOREIGN KEY ("id_user_messages") REFERENCES "users" ("id");

ALTER TABLE "message" ADD FOREIGN KEY ("id_sellers_messages") REFERENCES "sellers" ("id");
