-- AlterTable
ALTER TABLE "shorteners" ADD COLUMN     "password" TEXT;

-- AddForeignKey
ALTER TABLE "ip_addresses" ADD CONSTRAINT "ip_addresses_shortId_fkey" FOREIGN KEY ("shortId") REFERENCES "shorteners"("shortId") ON DELETE RESTRICT ON UPDATE CASCADE;
