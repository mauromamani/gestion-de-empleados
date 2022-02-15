const Swal = require('sweetalert2');
const { alertMessage } = require('../../components/alertMessage');
const { generateGrid } = require('../../components/grid');
const { getAllEmployees } = require('../../services/employees.service');
const { formatDate } = require('../../utils/formatDate');

// HTMl ref's
const tableWrapper = document.getElementById('table-wrapper');

// Events
window.addEventListener('DOMContentLoaded', DOMLoadedHandler);

// Functions
async function DOMLoadedHandler() {
  try {
    const employees = await getAllEmployees();

    // creo un nuevo arreglo de objetos, ya que es necesario que las columnas coincidan
    //acá llamo a la funcion para formatear la fecha y mandarla directamente a la vista ya formateada
    const data = employees.map((e) => ({
      id: e.id,
      nombre: e.nombre,
      apellido: e.apellido,
      creado: formatDate(e.creado),
    }));

    const grid = generateGrid(data);
    grid.render(tableWrapper);
  } catch (error) {
    console.log(error);
    Swal.fire(
      'Error en la carga de datos',
      'Por favor contacte con el administrador',
      'warning'
    );
    tableWrapper.innerHTML = alertMessage(
      'alert-danger',
      'Error en la carga de datos. Por favor contacte con el administrador'
    );
  }
}
