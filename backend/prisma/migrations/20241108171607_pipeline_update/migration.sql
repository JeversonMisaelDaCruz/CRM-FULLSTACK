/*
  Warnings:

  - You are about to drop the column `lead_status_id` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `pipeline_id` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the `lead_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "leads" DROP CONSTRAINT "leads_lead_status_id_fkey";

-- DropForeignKey
ALTER TABLE "leads" DROP CONSTRAINT "leads_pipeline_id_fkey";

-- AlterTable
ALTER TABLE "leads" DROP COLUMN "lead_status_id",
DROP COLUMN "pipeline_id",
ADD COLUMN     "pipeline_phase_id" UUID;

-- DropTable
DROP TABLE "lead_status";

-- CreateTable
CREATE TABLE "pipeline_phases" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(100) NOT NULL,
    "pipeline_id" UUID NOT NULL,

    CONSTRAINT "pipeline_phases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_pipeline_phase_id_fkey" FOREIGN KEY ("pipeline_phase_id") REFERENCES "pipeline_phases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pipeline_phases" ADD CONSTRAINT "pipeline_phases_pipeline_id_fkey" FOREIGN KEY ("pipeline_id") REFERENCES "pipelines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
