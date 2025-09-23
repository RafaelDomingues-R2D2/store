-- DropForeignKey
ALTER TABLE "public"."characteristics" DROP CONSTRAINT "characteristics_product_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."images" DROP CONSTRAINT "images_product_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_user_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."characteristics" ADD CONSTRAINT "characteristics_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."images" ADD CONSTRAINT "images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
