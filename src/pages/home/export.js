const { formatDate } = require('../../utils/formatDate');
const {
  alertConfirmation,
  alertSuccess,
  alertWarning,
} = require('../../utils/swal');
const { getAllEmployees } = require('../../services/employees.service');
const { exportar } = require('../../utils/export-table');

// Definicion de las funciones de los botones de la tabla
const exportTable = async () => {
  const result = await alertConfirmation('¿Querés exportar la tabla?', null);

  if (result.isConfirmed) {
    try {
      const employees = await getAllEmployees();

      const ar = employees.map((empleado) => ({
        nombre: empleado.nombre,
        apellido: empleado.apellido,
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
