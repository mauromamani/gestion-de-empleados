const { getAllEmployees } = require('../../services/employees.service');

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
    employeesTable.innerHTML += `
      <div>
        <p>Nombre: ${employee.nombre}</p>
        <p>Apellido : ${employee.apellido}</p>
        <p>Creado: ${employee.creado}</p>
      </div>
    `;
  });
}
