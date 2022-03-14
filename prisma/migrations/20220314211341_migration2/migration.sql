/*
  Warnings:

  - Added the required column `alta` to the `empleados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direccion` to the `empleados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni` to the `empleados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaNac` to the `empleados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `empleados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono1` to the `empleados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `empleados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empleados` ADD COLUMN `alta` DATETIME(3) NOT NULL,
    ADD COLUMN `direccion` VARCHAR(191) NOT NULL,
    ADD COLUMN `dni` INTEGER NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `fechaNac` DATETIME(3) NOT NULL,
    ADD COLUMN `sexo` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefono1` INTEGER NOT NULL,
    ADD COLUMN `telefono2` INTEGER NULL,
    ADD COLUMN `tipo` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `dni` INTEGER NOT NULL,
    `nombreUsuario` VARCHAR(191) NOT NULL,
    `contrasenya` VARCHAR(191) NOT NULL,
    `rol` ENUM('ADMIN', 'USER') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagenes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empleadoId` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `data` LONGBLOB NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `imagenes` ADD CONSTRAINT `imagenes_empleadoId_fkey` FOREIGN KEY (`empleadoId`) REFERENCES `empleados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
