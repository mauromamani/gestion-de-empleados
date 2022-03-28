const { prisma } = require('../database');

/**
 * @name getAllEmployees
 * @description retorna un arreglo de objetos Empleado o un arreglo vacio
 * @returns [{}Empleado] || []
 */
const getAllEmployees = async () => {
  return await prisma.empleado.findMany();
};

/**
 * @name getEmployeeById
 * @description retorna un empleado dado un id; en caso de no existir retorna null
 * @params id: number
 * @returns {}Empleado || null
 */
const getEmployeeById = async (id) => {
  const employee = await prisma.empleado.findUnique({ where: { id } });

  if (!employee) {
    return null;
  }

  return employee;
};

/**
 * @name createEmployee
 * @description crea un empleado dado los parametros, lo retorna
 * @params data: { nombre: string, apellido: string, etc }
 * @returns {}Empleado
 */
const createEmployee = async (data) => {
  return await prisma.empleado.create({
    data: {
      nombre: data.nombre,
      apellido: data.apellido,
      dni: data.dni,
      email: data.email,
      sexo: data.sexo,
      direccion: data.direccion,
      telefono1: data.telefono1,
      telefono2: data.telefono2,
      fechaNac: data.fechaNac,
      tipo: data.tipo,
    },
  });
};

/**
 * @name updateEmployee
 * @description modifica un empleado dado un id y data; en caso de no existir retorna null
 * @params id: number, data: { nombre: string, apellido: string, etc }
 * @returns {}Empleado || null
 */
const updateEmployee = async (id, data) => {
  const employee = await getEmployeeById(id);

  if (!employee) {
    return null;
  }

  return await prisma.empleado.update({
    where: { id },
    data: data,
  });
};

/**
 * @name deleteEmployee
 * @description elimina y retorna un empleado dado un id; en caso de no existir retorna null
 * @params id: number
 * @returns {}Empleado || null
 */
const deleteEmployee = async (id) => {
  const employee = await getEmployeeById(id);

  if (!employee) {
    return null;
  }

  return await prisma.empleado.delete({ where: { id } });
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
