/*
  Warnings:

  - The `config` column on the `Map` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Map" DROP COLUMN "config",
ADD COLUMN     "config" INTEGER[];
