/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `leadsStatus` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Lead` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_userId_fkey";

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "createdAt",
DROP COLUMN "leadsStatus",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lead_status_id" UUID,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" UUID;

-- DropEnum
DROP TYPE "LeadStatus";

-- CreateTable
CREATE TABLE "LeadStatus" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_lead_status_id_fkey" FOREIGN KEY ("lead_status_id") REFERENCES "LeadStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
