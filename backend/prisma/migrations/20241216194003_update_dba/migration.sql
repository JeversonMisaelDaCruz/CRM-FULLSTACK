/*
  Warnings:

  - The `status` column on the `deals` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DealStatus" AS ENUM ('go', 'nogo', 'pending');

-- AlterTable
ALTER TABLE "deals" DROP COLUMN "status",
ADD COLUMN     "status" "DealStatus" NOT NULL DEFAULT 'pending';
