const Swal = require('sweetalert2');
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
