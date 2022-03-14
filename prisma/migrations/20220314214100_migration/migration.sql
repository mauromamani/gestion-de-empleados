/*
  Warnings:

  - You are about to drop the column `alta` on the `empleados` table. All the data in the column will be lost.
  - Added the required column `estado` to the `empleados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaAlta` to the `empleados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empleados` DROP COLUMN `alta`,
    ADD COLUMN `estado` ENUM('ALTA', 'PROCESO', 'BAJA') NOT NULL,
    ADD COLUMN `fechaAlta` DATETIME(3) NOT NULL;
