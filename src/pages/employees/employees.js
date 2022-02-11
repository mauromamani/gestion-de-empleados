const { getAllEmployees } = require('../../services/employees.service');
const { table } = require('../../components/Table');
// HTMl ref's
const employeesTable = document.getElementById('employees-table');

// Events
window.addEventListener('DOMContentLoaded', loadEmployees);

// Functions

/**
 * @name loadEmployees
 * @description agrega los empleados al documento
 */
async function loadEmployees() {
  const employees = await getAllEmployees();

  if (!employees.length) {
    employeesTable.innerHTML = `
      <h1>No hay empleados cargados</h1>
    `;
    return;
  }

  employees.forEach((employee) => {
    employeesTable.innerHTML += table(employee);
  });



}
