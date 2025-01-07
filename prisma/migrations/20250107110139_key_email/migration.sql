/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Map` table. All the data in the column will be lost.
  - Added the required column `creatorEmail` to the `Map` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Map" DROP CONSTRAINT "Map_creatorId_fkey";

-- AlterTable
ALTER TABLE "Map" DROP COLUMN "creatorId",
ADD COLUMN     "creatorEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Map" ADD CONSTRAINT "Map_creatorEmail_fkey" FOREIGN KEY ("creatorEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
