/*
  Warnings:

  - You are about to drop the `empleado` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `empleado`;

-- CreateTable
CREATE TABLE `empleados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
