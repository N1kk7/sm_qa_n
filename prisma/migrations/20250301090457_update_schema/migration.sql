/*
  Warnings:

  - You are about to drop the `_EmployeeToPeriod` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EmployeeToPeriod" DROP CONSTRAINT "_EmployeeToPeriod_A_fkey";

-- DropForeignKey
ALTER TABLE "_EmployeeToPeriod" DROP CONSTRAINT "_EmployeeToPeriod_B_fkey";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Period" ADD COLUMN     "employeeIds" TEXT[];

-- DropTable
DROP TABLE "_EmployeeToPeriod";

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
