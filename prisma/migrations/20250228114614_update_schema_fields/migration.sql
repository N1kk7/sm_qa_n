/*
  Warnings:

  - You are about to drop the column `message` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `TweetReply` table. All the data in the column will be lost.
  - Added the required column `taskStatus` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complBy` to the `Tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complTimeSt` to the `Tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstTimeSt` to the `Tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkStatus` to the `TweetReply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `standFormat` to the `TweetReply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "taskStatus" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "message",
ADD COLUMN     "complBy" TEXT NOT NULL,
ADD COLUMN     "complTimeSt" TEXT NOT NULL,
ADD COLUMN     "connectProf" TEXT,
ADD COLUMN     "firstTimeSt" TEXT NOT NULL,
ADD COLUMN     "timestamp" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TweetReply" DROP COLUMN "status",
ADD COLUMN     "checkStatus" TEXT NOT NULL,
ADD COLUMN     "standFormat" TEXT NOT NULL;
