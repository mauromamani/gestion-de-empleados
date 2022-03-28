/*
  Warnings:

  - You are about to drop the `imagenes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `imagenes` DROP FOREIGN KEY `imagenes_empleadoId_fkey`;

-- AlterTable
ALTER TABLE `empleados` ADD COLUMN `img_dni_frontal` LONGBLOB NULL,
    ADD COLUMN `img_dni_trasera` LONGBLOB NULL,
    ADD COLUMN `img_perfil` LONGBLOB NULL;

-- DropTable
DROP TABLE `imagenes`;
