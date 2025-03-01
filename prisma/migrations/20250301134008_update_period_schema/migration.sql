/*
  Warnings:

  - You are about to drop the column `periodId` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `periodId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_periodId_fkey";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "periodId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "periodId";

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
