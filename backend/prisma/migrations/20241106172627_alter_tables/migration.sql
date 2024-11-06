/*
  Warnings:

  - You are about to drop the `lead_statuses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "leads" DROP CONSTRAINT "leads_lead_status_id_fkey";

-- DropTable
DROP TABLE "lead_statuses";

-- CreateTable
CREATE TABLE "lead_status" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "lead_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_lead_status_id_fkey" FOREIGN KEY ("lead_status_id") REFERENCES "lead_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
