/*
  Warnings:

  - Added the required column `time` to the `Tweet` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `timestamp` on the `Tweet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "time" TEXT NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT,
DROP COLUMN "timestamp",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
