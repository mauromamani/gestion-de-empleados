const { alertMessage } = require('../../components/alertMessage');
const { alertWarning } = require('../../utils/swal');
const { generateGrid } = require('../../components/grid');
const { getAllEmployees } = require('../../services/employees.service');
const { getCurrentUser } = require('../../utils/getCurrentUser');
const { exportTable } = require('./export');
const { navbar } = require('../../components/navbar');
// HTMl ref's
const tableWrapper = document.getElementById('table-wrapper');
const nav = document.getElementById('navbar');

// Events
window.addEventListener('DOMContentLoaded', DOMLoadedHandler);

// Functions
async function DOMLoadedHandler() {
  // ejemplo de obtencion del usuario autenticado
  //const currentUser = getCurrentUser();
  // console.log(currentUser);

  nav.innerHTML = navbar(true, 'home');

  document
    .getElementById('salir')
    .addEventListener('click', cerrarSesion);

  document
    .getElementById('exportar')
    .addEventListener('click', exportTableHandler);
  try {
    const employees = await getAllEmployees();

    // creo un nuevo arreglo de objetos, ya que es necesario que las columnas coincidan
    // acá llamo a la funcion para formatear la fecha y mandarla directamente a la vista ya formateada
    const data = employees.map((e) => ({
      id: e.id,
      nombre: e.nombre,
      apellido: e.apellido,
      estado: e.estado,
      dni: e.dni,
      tipoEmpleado: e.tipo,
    }));

    const grid = generateGrid(data);
    grid.render(tableWrapper);
  } catch (error) {
    console.log(error);
    alertWarning('Error en la carga de datos');
    tableWrapper.innerHTML = alertMessage(
      'alert-danger',
      'Error en la carga de datos. Por favor contacte con el administrador'
    );
  }
}

function exportTableHandler() {
  exportTable();
}
function cerrarSesion() {
  localStorage.clear();
  window.location.href = '../auth/login.html';
}