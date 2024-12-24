/*
  Warnings:

  - You are about to drop the `peminjamanperangkat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `peminjamanruangan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `peminjamanperangkat` DROP FOREIGN KEY `PeminjamanPerangkat_perangkatId_fkey`;

-- DropForeignKey
ALTER TABLE `peminjamanperangkat` DROP FOREIGN KEY `PeminjamanPerangkat_userId_fkey`;

-- DropForeignKey
ALTER TABLE `peminjamanruangan` DROP FOREIGN KEY `PeminjamanRuangan_ruanganId_fkey`;

-- DropForeignKey
ALTER TABLE `peminjamanruangan` DROP FOREIGN KEY `PeminjamanRuangan_userId_fkey`;

-- DropTable
DROP TABLE `peminjamanperangkat`;

-- DropTable
DROP TABLE `peminjamanruangan`;

-- CreateTable
CREATE TABLE `peminjaman_perangkat` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `jenis` VARCHAR(191) NOT NULL DEFAULT 'perangkat',
    `perangkatId` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `tgl_mulai` DATETIME(3) NOT NULL,
    `tgl_selesai` DATETIME(3) NOT NULL,
    `isSelesai` BOOLEAN NOT NULL DEFAULT true,
    `keterangan` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peminjaman_ruangan` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `jenis` VARCHAR(191) NOT NULL DEFAULT 'ruangan',
    `ruanganId` VARCHAR(191) NOT NULL,
    `tgl_mulai` DATETIME(3) NOT NULL,
    `tgl_selesai` DATETIME(3) NOT NULL,
    `isSelesai` BOOLEAN NOT NULL DEFAULT true,
    `keterangan` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `peminjaman_perangkat` ADD CONSTRAINT `peminjaman_perangkat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman_perangkat` ADD CONSTRAINT `peminjaman_perangkat_perangkatId_fkey` FOREIGN KEY (`perangkatId`) REFERENCES `Perangkat`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman_ruangan` ADD CONSTRAINT `peminjaman_ruangan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman_ruangan` ADD CONSTRAINT `peminjaman_ruangan_ruanganId_fkey` FOREIGN KEY (`ruanganId`) REFERENCES `Ruangan`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
