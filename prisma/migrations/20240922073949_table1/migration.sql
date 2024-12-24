-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `nama_lengkap` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('PEGAWAI', 'ADMIN') NOT NULL DEFAULT 'PEGAWAI',
    `Created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Perangkat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_perangkat` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `img_url` VARCHAR(191) NOT NULL,
    `tersedia` INTEGER NOT NULL DEFAULT 0,
    `dipinjam` INTEGER NOT NULL DEFAULT 0,
    `jumlah` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ruangan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_ruangan` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `img_url` VARCHAR(191) NOT NULL,
    `isTersedia` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
