CREATE TABLE IF NOT EXISTS "articles_read" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"article_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"timestamp2" timestamp (6) with time zone,
	"time_spent" numeric NOT NULL
);
