const {
  updateEmployee,
  getEmployeeById,
} = require('../../services/employees.service');
const Swal = require('sweetalert2');

// obtenemos el id de localstorage y lo convertimos a int
const employeeId = parseInt(localStorage.getItem('id'));

// Html ref's
const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const tipo = document.getElementById('tipo');

// Events
window.addEventListener('DOMContentLoaded', DOMLoadedHandler);
formulario.addEventListener('submit', formHandler);

// Events functions
async function DOMLoadedHandler() {
  const employee = await getEmployeeById(employeeId);
  nombre.value = employee.nombre;
  apellido.value = employee.apellido;
}

async function formHandler(e) {
  e.preventDefault();

  const updatedEmployee = {
    nombre: nombre.value,
    apellido: apellido.value,
  };

  try {
    await updateEmployee(employeeId, updatedEmployee);
    Swal.fire(
      `Modificación exitosa`,
      `${updatedEmployee.nombre} ha sido modificado con éxito`,
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
