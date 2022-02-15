const { createEmployee } = require('../../services/employees.service');
const Swal = require('sweetalert2');

// Html ref's
const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const tipo = document.getElementById('tipo');

// Events
formulario.addEventListener('submit', formHandler);

// Events functions
async function formHandler(e) {
  //este lo puse para que detenga la recarga cuando haces el submit
  e.preventDefault();

  const nuevoEmpleado = {
    nombre: nombre.value,
    apellido: apellido.value,
  };
  try {
    await createEmployee(nuevoEmpleado);

    // restablecer valores iniciales
    nombre.value = '';
    apellido.value = '';
    tipo.value = '';
    Swal.fire(
      `Empleado creado`,
      `${nuevoEmpleado.nombre} ha sido creado con éxito`,
      'success'
    );
  } catch (err) {
    //mostrar alerta de error de carga
    console.log('error');
    Swal.fire(
      'Error en la ejecución de esta acción',
      'Por favor contacte con el administrador',
      'warning'
    );
  }
}
