-- AlterTable
ALTER TABLE `empleados` MODIFY `estado` ENUM('ALTA', 'PROCESO', 'BAJA') NOT NULL DEFAULT 'BAJA';
