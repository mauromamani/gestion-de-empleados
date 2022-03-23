const { navbar } = require('../../components/navbar');
const { getEmployeeById } = require('../../services/employees.service');

const nav = document.getElementById('navbar');
const boton = document.getElementById('modificar');
window.addEventListener('DOMContentLoaded', DOMLoadedHandler);
const employeeId = localStorage.getItem('employee-id');

async function DOMLoadedHandler() {
  nav.innerHTML = navbar(false);
  const employee = await getEmployeeById(parseInt(employeeId));
  console.log(employee);
  //cuando se aprieta en modificar se manda el id del empleado al formulario
  //para modificarlo
  boton.onclick = modificar;
  function modificar() {
    localStorage.setItem('id', employee.id);
    window.location.href = '../employees/form-edit.html';
  }
  // Acá se cargaría la información a mostrar en el HTML
}
