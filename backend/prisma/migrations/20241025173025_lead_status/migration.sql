/*
  Warnings:

  - You are about to drop the column `status` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `leadsStatus` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('new', 'in_progress', 'closed', 'rejected');

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "status",
ADD COLUMN     "leadsStatus" "LeadStatus" NOT NULL;
