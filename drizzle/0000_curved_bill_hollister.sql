CREATE TABLE IF NOT EXISTS "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"summary" text,
	"author" text,
	"published_at" text,
	"updated_at" text,
	"language" text,
	"category" text,
	"label" text,
	"source_url" text,
	"source" text
);
