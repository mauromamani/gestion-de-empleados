const {
  updateEmployee,
  getEmployeeById,
} = require('../../services/employees.service');
const { alertSuccess, alertWarning } = require('../../utils/swal');
const { navbar } = require('../../components/navbar');

// obtenemos el id de localstorage y lo convertimos a int
const employeeId = parseInt(localStorage.getItem('id'));

// Html ref's
const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const tipo = document.getElementById('tipo');
const nav = document.getElementById('navbar');

// Events
window.addEventListener('DOMContentLoaded', DOMLoadedHandler);
formulario.addEventListener('submit', formHandler);

// Events functions
async function DOMLoadedHandler() {
  nav.innerHTML = navbar(false);
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
    alertSuccess(`${updatedEmployee.nombre} ha sido modificado con éxito`);
  } catch (err) {
    console.log(err);
    alertWarning();
  }
}
