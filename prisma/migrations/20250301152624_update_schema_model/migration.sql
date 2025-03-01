/*
  Warnings:

  - You are about to drop the column `date` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the `Shift` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dates` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shiftName` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shiftValue` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_shiftId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "date",
ADD COLUMN     "dates" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "shiftName" TEXT NOT NULL,
ADD COLUMN     "shiftValue" TEXT NOT NULL;

-- DropTable
DROP TABLE "Shift";
