-- DropForeignKey
ALTER TABLE "ip_addresses" DROP CONSTRAINT "ip_addresses_shortId_fkey";

-- AddForeignKey
ALTER TABLE "ip_addresses" ADD CONSTRAINT "ip_addresses_shortId_fkey" FOREIGN KEY ("shortId") REFERENCES "shorteners"("shortId") ON DELETE CASCADE ON UPDATE CASCADE;
