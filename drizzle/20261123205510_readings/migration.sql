CREATE TYPE "reading_status" AS ENUM('read', 'paused', 'abandoned');--> statement-breakpoint
CREATE TABLE "readings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"notion_page_id" text NOT NULL UNIQUE,
	"title" text NOT NULL,
	"author" text,
	"rating" integer,
	"status" "reading_status",
	"year_read" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "readings_rating_range" CHECK ("rating" between 1 and 5)
);
