const { prisma } = require('../database');

/**
 * @name getAllEmployees
 * @description retorna un arreglo de empleados o un arreglo vacío
 * @returns []Empleados || []
 */
const getAllEmployees = async () => {
  return await prisma.empleado.findMany();
};

const createEmployee = async () => {
  return await prisma.empleado.create({
    data: {
      nombre: 'perro',
      apellido: 'loco',
    },
  });
};

module.exports = {
  getAllEmployees,
  createEmployee,
};
