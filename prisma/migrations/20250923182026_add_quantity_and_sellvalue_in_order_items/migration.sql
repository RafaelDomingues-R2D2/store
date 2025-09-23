/*
  Warnings:

  - Added the required column `quantity` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellValue` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."order_items" ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "sellValue" DOUBLE PRECISION NOT NULL;
