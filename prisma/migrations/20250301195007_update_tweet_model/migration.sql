/*
  Warnings:

  - You are about to drop the column `content` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `message` to the `Tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `Tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskStatus` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_periodId_fkey";

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "content",
DROP COLUMN "platform",
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "network" TEXT NOT NULL,
ADD COLUMN     "taskStatus" TEXT NOT NULL;

-- DropTable
DROP TABLE "Task";
