/*
  Warnings:

  - You are about to drop the column `user_id` on the `pipelines` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pipelines" DROP CONSTRAINT "pipelines_user_id_fkey";

-- AlterTable
ALTER TABLE "pipelines" DROP COLUMN "user_id";
