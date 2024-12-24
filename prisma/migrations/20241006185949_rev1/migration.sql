/*
  Warnings:

  - You are about to drop the column `passsword` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `passsword`,
    ADD COLUMN `password` VARCHAR(191) NULL;
