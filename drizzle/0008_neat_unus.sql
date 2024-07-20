ALTER TABLE "articles_read" RENAME COLUMN "timestamp2" TO "timestamp";--> statement-breakpoint
ALTER TABLE "articles_read" ALTER COLUMN "timestamp" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "articles_read" ALTER COLUMN "timestamp" SET DEFAULT now();