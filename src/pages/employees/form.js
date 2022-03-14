const { createEmployee } = require('../../services/employees.service');
const { alertSuccess, alertWarning } = require('../../utils/swal');

// Html ref's
const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const tipo = document.getElementById('tipo');

// Events
formulario.addEventListener('submit', formHandler);

// Events functions
async function formHandler(e) {
  e.preventDefault();

  const nuevoEmpleado = {
    nombre: nombre.value,
    apellido: apellido.value,
  };

  try {
    await createEmployee(nuevoEmpleado);

    // Restablecer valores iniciales
    nombre.value = '';
    apellido.value = '';
    tipo.value = '';

    alertSuccess(`${nuevoEmpleado.nombre} ha sido creado con éxito`);
  } catch (err) {
    console.log(err);
    alertWarning();
  }
}
