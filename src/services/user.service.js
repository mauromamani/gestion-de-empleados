const { prisma } = require('../database');
//si necesitamos más metodos los vamos agregando,
//yo supuse que solo vamos a usar estos
//para agregar los admins vamos a tener que hacerlo desde los comandos
//o desde el workbench
/**
 * @name getAllUsers
 * @description retorna un arreglo de objetos Usuarios o un arreglo vacio
 * @returns [{}Usuario] || []
 */
const getAllUsers = async () => {
  return await prisma.usuario.findMany();
};

/**
 * @name getUserById
 * @description retorna un usuario dado un id; en caso de no existir retorna null
 * @params id: number
 * @returns {}Usuario || null
 */
const getUserById = async (id) => {
  const user = await prisma.usuario.findUnique({ where: { id } });

  if (!user) {
    return null;
  }

  return user;
};

/**
 * @name createUser
 * @description crea un usuario dado los parametros, lo retorna
 * @params data: { nombre: string, apellido: string, etc }
 * @returns {}Usuario
 */
const createUser = async (data) => {
  return await prisma.usuario.create({
    data: {
      nombre: data.nombre,
      apellido: data.apellido,
      dni: data.dni,
      nombreUsuario: data.nombreUsuario,
      contrasenya: data.contrasenya,
      rol: 'USER'
    },
  });
};

/**
 * @name updateUser
 * @description modifica un usuario dado un id y data; en caso de no existir retorna null
 * @params id: number, data: { nombre: string, apellido: string, etc }
 * @returns {}Usuario || null
 */
const updateUser = async (id, data) => {
  const user = await getUserById(id);

  if (!user) {
    return null;
  }

  return await prisma.usuario.update({
    where: { id },
    data: {
      nombre: data.nombre,
      apellido: data.apellido,
      dni: data.dni,
      nombreUsuario: data.nombreUsuario,
      contrasenya: data.contrasenya,
    },
  });
};

/**
 * @name deleteUser
 * @description elimina y retorna un usuario dado un id; en caso de no existir retorna null
 * @params id: number
 * @returns {}Usuario || null
 */
const deleteUser = async (id) => {
  const user = await getUserById(id);

  if (!user) {
    return null;
  }

  return await prisma.usuario.delete({ where: { id } });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
