/*
  Warnings:

  - You are about to drop the column `isSelesai` on the `peminjaman_perangkat` table. All the data in the column will be lost.
  - You are about to drop the column `isSelesai` on the `peminjaman_ruangan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `peminjaman_perangkat` DROP COLUMN `isSelesai`,
    ADD COLUMN `isDipinjam` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `peminjaman_ruangan` DROP COLUMN `isSelesai`,
    ADD COLUMN `isDipinjam` BOOLEAN NOT NULL DEFAULT true;
