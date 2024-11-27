/*
  Warnings:

  - You are about to drop the column `user_id` on the `pipelines` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pipelines" DROP CONSTRAINT "pipelines_user_id_fkey";

-- AlterTable
ALTER TABLE "pipelines" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "pipeline_users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "pipeline_id" UUID NOT NULL,

    CONSTRAINT "pipeline_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pipeline_users_user_id_pipeline_id_key" ON "pipeline_users"("user_id", "pipeline_id");

-- AddForeignKey
ALTER TABLE "pipeline_users" ADD CONSTRAINT "pipeline_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pipeline_users" ADD CONSTRAINT "pipeline_users_pipeline_id_fkey" FOREIGN KEY ("pipeline_id") REFERENCES "pipelines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
