-- AlterTable
ALTER TABLE `peminjaman_perangkat` ADD COLUMN `status` ENUM('Diproses', 'Dipinjam', 'Ditolak', 'Selesai') NOT NULL DEFAULT 'Diproses';

-- AlterTable
ALTER TABLE `peminjaman_ruangan` ADD COLUMN `status` ENUM('Diproses', 'Dipinjam', 'Ditolak', 'Selesai') NOT NULL DEFAULT 'Diproses';
