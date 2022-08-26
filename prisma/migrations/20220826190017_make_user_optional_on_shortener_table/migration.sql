-- DropForeignKey
ALTER TABLE "shorteners" DROP CONSTRAINT "shorteners_userId_fkey";

-- AlterTable
ALTER TABLE "shorteners" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "shorteners" ADD CONSTRAINT "shorteners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
