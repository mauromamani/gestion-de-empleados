const Swal = require('sweetalert2');
const { formatDate } = require('../../utils/formatDate');
const { getAllEmployees } = require('../../services/employees.service');
const { exportar } = require('../../utils/export-table');
// Definicion de las funciones de los botones de la tabla
const exportTable = async () => {
  const result = await Swal.fire({
    title: `¿Estás seguro que quieres exportar la tabla?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, quiero exportarla',
  });

  if (result.isConfirmed) {
    try {
      //la funcion va acá

      const employees = await getAllEmployees();

      // creo un nuevo arreglo de objetos, ya que es necesario que las columnas coincidan
      //acá llamo a la funcion para formatear la fecha y mandarla directamente a la vista ya formateada
      const ar = employees.map((empleado) => ({
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        creado: formatDate(empleado.creado),
      }));
      //exportamos la tabla a un archivo csv
      exportar(ar);
      await Swal.fire(
        'Realizado',
        `La Tabla fue exportada con éxito`,
        'success'
      );
      //location.reload();
    } catch (error) {
      console.log(error);
      Swal.fire(
        'Error en la ejecución de esta acción',
        'Por favor contacte con el administrador',
        'warning'
      );
    }
  }
};
module.exports = {
  exportTable
}
