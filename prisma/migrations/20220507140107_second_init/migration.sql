/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `bayeurs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "bayeurs" ADD COLUMN     "hashedRt" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "bayeurs_email_key" ON "bayeurs"("email");
