const { Grid } = require('gridjs');
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

  const data = employees.map((e) => ({
    nombre: e.nombre,
    apellido: e.apellido,
    creado: e.nombre,
  }));

  new Grid({
    columns: ['Nombre', 'Apellido', 'Creado'],
    sort: true,
    data: data,
  }).render(tableWrapper);
}
