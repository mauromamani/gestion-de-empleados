const { formatDate, formatDateNac } = require('../../utils/formatDate');
const {
  alertConfirmation,
  alertSuccess,
  alertWarning,
} = require('../../utils/swal');
const { getAllEmployees } = require('../../services/employees.service');
const { exportar } = require('../../utils/export-table');
const { formatTel, formatEmail } = require('../../utils/formatData');
// Definicion de las funciones de los botones de la tabla
const exportTable = async () => {
  const result = await alertConfirmation('¿Querés exportar la tabla?', null);

  if (result.isConfirmed) {
    try {
      const employees = await getAllEmployees();

      const ar = employees.map((empleado) => ({
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        dni: empleado.dni,
        fechaNac: formatDateNac(empleado.fechaNac),
        sexo: empleado.sexo,
        direccion: empleado.direccion,
        telefono1: empleado.telefono1,
        telefono2: formatTel(empleado.telefono2),
        email: formatEmail(empleado.email),
        tipo: empleado.tipo,
        fechaAlta: formatDate(empleado.fechaAlta),
        estado: empleado.estado,
        creado: formatDate(empleado.creado),

      }));

      //exportamos la tabla a un archivo csv
      exportar(ar);

      alertSuccess(`La tabla fue exportada con éxito`);
    } catch (error) {
      console.log(error);
      alertWarning();
    }
  }
};

module.exports = { exportTable };
