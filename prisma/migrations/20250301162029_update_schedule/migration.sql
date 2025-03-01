/*
  Warnings:

  - You are about to drop the column `shiftId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `shiftValue` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "shiftId",
DROP COLUMN "shiftValue";
