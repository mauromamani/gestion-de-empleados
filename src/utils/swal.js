const Swal = require('sweetalert2');

const alertSuccess = async (msg) => {
  await Swal.fire(`Exito`, msg, 'success');
};

const alertWarning = (msg = 'Error en la ejecución de esta acción') => {
  Swal.fire(`Error`, msg, 'warning');
};

const alertConfirmation = async (
  title = '¿Estás seguro de ejecutar esta acción?',
  text = 'Los cambios no pueden ser deshechos'
) => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, quiero ejecutar la acción',
  });

  return result;
};

module.exports = { alertSuccess, alertConfirmation, alertWarning };
