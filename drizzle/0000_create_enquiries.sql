CREATE TYPE "public"."enquiry_intent" AS ENUM('family', 'council', 'business');--> statement-breakpoint
CREATE TYPE "public"."enquiry_status" AS ENUM('new', 'in_progress', 'closed');--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"intent" "enquiry_intent" NOT NULL,
	"status" "enquiry_status" DEFAULT 'new' NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(254) NOT NULL,
	"phone" varchar(30),
	"message" text NOT NULL,
	"organisation" varchar(200),
	"care_for" varchar(32),
	"postcode" varchar(12),
	"package_type" varchar(32),
	"stage" varchar(32),
	"consent_given_at" timestamp with time zone DEFAULT now() NOT NULL,
	"source_path" varchar(512),
	"email_status" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "enquiries_status_created_at_idx" ON "enquiries" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "enquiries_email_idx" ON "enquiries" USING btree ("email");