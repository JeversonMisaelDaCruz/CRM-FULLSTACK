-- AlterTable
ALTER TABLE "pipeline_phases" ALTER COLUMN "pipeline_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tokens" ALTER COLUMN "user_id" DROP NOT NULL;
