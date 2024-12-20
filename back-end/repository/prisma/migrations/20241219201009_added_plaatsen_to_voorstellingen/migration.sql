/*
  Warnings:

  - Added the required column `plaatsen` to the `Voorstelling` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Voorstelling" ADD COLUMN     "plaatsen" INTEGER NOT NULL;
