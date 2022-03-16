const { navbar } = require('../../components/navbar');
const { getEmployeeById } = require('../../services/employees.service');

const nav = document.getElementById('navbar');

window.addEventListener('DOMContentLoaded', DOMLoadedHandler);

const employeeId = localStorage.getItem('employee-id');

async function DOMLoadedHandler() {
  nav.innerHTML = navbar(false);

  const employee = await getEmployeeById(parseInt(employeeId));
  console.log(employee);

  // Acá se cargaría la información a mostrar en el HTML
}
