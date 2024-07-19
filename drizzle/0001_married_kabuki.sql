CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"password" text,
	"phone_number" text,
	"name" text,
	"authentication_type" text,
	"dob" text,
	"gender" text
);
