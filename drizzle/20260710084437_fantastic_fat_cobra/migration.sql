CREATE TYPE "course_status" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"code" varchar(20) NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	"description" text,
	"credits" integer NOT NULL,
	"capacity" integer NOT NULL,
	"status" "course_status" DEFAULT 'ACTIVE'::"course_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
