-- AlterTable
ALTER TABLE "User" ADD COLUMN     "keys" TEXT[] DEFAULT '{keyRight,keyLeft,keyDown,keyUp,2,3}'::text[];
