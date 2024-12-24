/*
  Warnings:

  - Added the required column `lokasi` to the `Ruangan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ruangan` ADD COLUMN `lokasi` VARCHAR(191) NOT NULL;
