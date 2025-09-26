CREATE TABLE IF NOT EXISTS "tableuser" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	"surname" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "barter" (
	"id" serial NOT NULL UNIQUE,
	"user_id" bigint NOT NULL,
	"give_name" varchar(255) NOT NULL,
	"give_link_image" varchar(255) NOT NULL,
	"give_description" varchar(255) NOT NULL,
	"give_category_id" bigint NOT NULL,
	"get_name" varchar(255) NOT NULL,
	"get_link_image" varchar(255) NOT NULL,
	"get_description" varchar(255) NOT NULL,
	"get_category_id" bigint NOT NULL,
	"free" boolean NOT NULL DEFAULT false,
	"city_id" bigint NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "message" (
	"id" serial NOT NULL UNIQUE,
	"user_sender_id" bigint NOT NULL,
	"user_recipient_id" bigint NOT NULL,
	"messages_json" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "city" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "category" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);


ALTER TABLE "barter" ADD CONSTRAINT "barter_fk1" FOREIGN KEY ("user_id") REFERENCES "tableuser"("id");

ALTER TABLE "barter" ADD CONSTRAINT "barter_fk5" FOREIGN KEY ("give_category_id") REFERENCES "category"("id");

ALTER TABLE "barter" ADD CONSTRAINT "barter_fk9" FOREIGN KEY ("get_category_id") REFERENCES "category"("id");

ALTER TABLE "barter" ADD CONSTRAINT "barter_fk11" FOREIGN KEY ("city_id") REFERENCES "city"("id");
ALTER TABLE "message" ADD CONSTRAINT "message_fk1" FOREIGN KEY ("user_sender_id") REFERENCES "tableuser"("id");

ALTER TABLE "message" ADD CONSTRAINT "message_fk2" FOREIGN KEY ("user_recipient_id") REFERENCES "tableuser"("id");

