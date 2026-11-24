-- CreateTable
CREATE TABLE `buku` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isbn` VARCHAR(20) NOT NULL,
    `judul` VARCHAR(150) NOT NULL,
    `penulis` VARCHAR(100) NOT NULL,
    `harga` INTEGER NOT NULL,
    `stok` INTEGER NOT NULL DEFAULT 0,
    `tanggalTerbit` DATE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `buku_isbn_key`(`isbn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peminjaman` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bukuId` INTEGER NOT NULL,
    `namaPeminjam` VARCHAR(100) NOT NULL,
    `jumlah` INTEGER NOT NULL DEFAULT 1,
    `tanggalPinjam` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_bukuId_fkey` FOREIGN KEY (`bukuId`) REFERENCES `buku`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
