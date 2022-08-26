/*
  Warnings:

  - The primary key for the `shorteners` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `shorteners` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shorteners" DROP CONSTRAINT "shorteners_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "shorteners_pkey" PRIMARY KEY ("shortId");
