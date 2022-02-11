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

      <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">${employee.nombre}</th>
          <td>${employee.apellido}</td>
          <td>${employee.creado}</td>
        </tr>
      </tbody>
    </table>
  
    `;
  });



}
