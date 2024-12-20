/*
  Warnings:

  - Added the required column `zaalnummer` to the `Zaal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Zaal" ADD COLUMN     "zaalnummer" INTEGER NOT NULL;
