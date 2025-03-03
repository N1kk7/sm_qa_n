/*
  Warnings:

  - You are about to drop the column `dates` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `shiftName` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `date` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shiftPosition` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workShift` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "dates",
DROP COLUMN "shiftName",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "shiftPosition" TEXT NOT NULL,
ADD COLUMN     "workShift" TEXT NOT NULL;
