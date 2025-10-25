-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "full_name" TEXT,
    "bio" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firebase_uid" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."projects" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tech_stack" TEXT[],
    "student_id" UUID,
    "created_at" TIMESTAMPTZ(6),
    "created_by" UUID,
    "mentee_id" UUID,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mentorships" (
    "mentor_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "expert_id" UUID NOT NULL,
    "topic" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mentee_id" UUID,

    CONSTRAINT "mentorships_pkey" PRIMARY KEY ("mentor_id")
);

-- CreateTable
CREATE TABLE "public"."events" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scheduled_at" TIMESTAMP(6) NOT NULL,
    "host_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "created_by" UUID,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."event_registrations" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "mentee_id" UUID,

    CONSTRAINT "event_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."webinars" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date_time" TIMESTAMP(6) NOT NULL,
    "speaker" TEXT,
    "created_by" UUID,
    "created_at" TIMESTAMP(6),

    CONSTRAINT "webinars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."webinar_registrations" (
    "id" UUID NOT NULL,
    "webinar_id" UUID,
    "user_id" UUID,
    "registered_at" TIMESTAMP(6),

    CONSTRAINT "webinar_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."forum_posts" (
    "id" UUID NOT NULL,
    "author_id" UUID,
    "title" TEXT,
    "content" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "forum_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."forum_replies" (
    "id" UUID NOT NULL,
    "post_id" UUID,
    "author_id" UUID,
    "content" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "forum_replies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_firebase_uid_key" ON "public"."users"("firebase_uid");

-- CreateIndex
CREATE UNIQUE INDEX "webinar_registrations_webinar_id_user_id_key" ON "public"."webinar_registrations"("webinar_id", "user_id");
