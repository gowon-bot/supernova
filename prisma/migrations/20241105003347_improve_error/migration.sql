/*
  Warnings:

  - You are about to drop the column `category` on the `Error` table. All the data in the column will be lost.
  - Added the required column `kind` to the `Error` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Error` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Error" DROP COLUMN "category",
ADD COLUMN     "kind" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL;
