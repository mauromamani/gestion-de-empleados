const { Grid } = require('gridjs');
const { esES } = require('gridjs/l10n');
const { alertMessage } = require('../../components/alertMessage');
const { getAllEmployees } = require('../../services/employees.service');

// HTMl ref's
const tableWrapper = document.getElementById('table-wrapper');

// Events
window.addEventListener('DOMContentLoaded', loadEmployees);

// Functions
async function loadEmployees() {
  const employees = await getAllEmployees();

  if (!employees.length) {
    tableWrapper.innerHTML = alertMessage(
      'alert-info',
      'No hay empleados registrados'
    );
    return;
  }

  //funcion que formatea la fecha del objeto que recibe
  const formatDate = (date) => {
    let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    return formatted_date;
  }
  // creo un nuevo arreglo de objetos, ya que es necesario que las columnas coincidan
  //acá llamo a la funcion para formatear la fecha y mandarla directamente a la vista ya formateada
  const data = employees.map((e) => ({
    nombre: e.nombre,
    apellido: e.apellido,
    creado: formatDate(e.creado),
  }));

  new Grid({
    columns: ['Nombre', 'Apellido', 'Creado'],
    search: {
      enabled: true,
    },
    sort: true,
    data: data,
    pagination: {
      enabled: true,
      limit: 6,
      summary: false,
    },
    style: {
      table: {
        width: '100%',
      },
    },
    language: esES,
  }).render(tableWrapper);

}
