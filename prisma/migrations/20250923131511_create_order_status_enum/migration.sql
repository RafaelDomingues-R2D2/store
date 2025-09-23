/*
  Warnings:

  - You are about to drop the column `totalValue` on the `orders` table. All the data in the column will be lost.
  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `total_value` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PROCESSING', 'PROCESSED', 'CANCELED');

-- AlterTable
ALTER TABLE "public"."orders" DROP COLUMN "totalValue",
ADD COLUMN     "total_value" DOUBLE PRECISION NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."OrderStatus" NOT NULL DEFAULT 'PROCESSING';
