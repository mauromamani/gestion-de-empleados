const Swal = require('sweetalert2');

export const alertSuccess = (msg) => {
  Swal.fire(`Exito`, msg, 'success');
};

export const alertWarning = (msg) => {
  Swal.fire(`Error`, msg, 'warning');
};
