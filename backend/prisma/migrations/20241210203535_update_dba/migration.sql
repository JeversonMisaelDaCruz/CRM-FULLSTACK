-- AlterTable
ALTER TABLE "deals" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "due_date" TIMESTAMP(3),
ADD COLUMN     "status" VARCHAR(30) NOT NULL DEFAULT 'pending';

-- CreateTable
CREATE TABLE "DealEvent" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "deal_id" UUID,
    "user_id" UUID,

    CONSTRAINT "DealEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealComment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "user_id" UUID,
    "deal_id" UUID,

    CONSTRAINT "DealComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DealEvent" ADD CONSTRAINT "DealEvent_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "deals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealEvent" ADD CONSTRAINT "DealEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealComment" ADD CONSTRAINT "DealComment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealComment" ADD CONSTRAINT "DealComment_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "deals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
