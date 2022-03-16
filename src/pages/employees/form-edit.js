const {
  updateEmployee,
  getEmployeeById,
} = require('../../services/employees.service');
const { alertSuccess, alertWarning } = require('../../utils/swal');
const { navbar } = require('../../components/navbar');
const { formatDateIso } = require('../../utils/formatDate');
const { formatTel, formatEmail } = require('../../utils/formatData');
// obtenemos el id de localstorage y lo convertimos a int
const employeeId = parseInt(localStorage.getItem('id'));

// Html ref's
const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const dni = document.getElementById('dni');
const email = document.getElementById('email');
const sexo = document.getElementById('sexo');
const direccion = document.getElementById('direccion');
const telefono1 = document.getElementById('tel1');
const telefono2 = document.getElementById('tel2');
const fechaNac = document.getElementById('fechaNac');
const tipo = document.getElementById('tipoEmpleado');
const nav = document.getElementById('navbar');

// Events
window.addEventListener('DOMContentLoaded', DOMLoadedHandler);
formulario.addEventListener('submit', formHandler);

// Events functions
async function DOMLoadedHandler() {
  nav.innerHTML = navbar(false);
  console.log(localStorage.getItem('id'));
  const employee = await getEmployeeById(employeeId);
  nombre.value = employee.nombre;
  apellido.value = employee.apellido;
  dni.value = employee.dni;
  email.value = employee.email;
  sexo.value = employee.sexo;
  direccion.value = employee.direccion;
  telefono1.value = employee.telefono1;
  telefono2.value = employee.telefono2;
  fechaNac.value = formatDateIso(employee.fechaNac);
  tipo.value = employee.tipo;
}

async function formHandler(e) {
  e.preventDefault();
  //parse de datos para guardar a la db de forma correcta
  const auxDni = parseInt(dni.value);
  const auxTelefono1 = parseInt(telefono1.value);
  const auxTelefono2 = formatTel(telefono2.value);
  const auxEmail = formatEmail(email.value);
  //formato tipo fecha para guardar en la bd
  const auxFechaNac = new Date(fechaNac.value);

  const updatedEmployee = {
    nombre: nombre.value,
    apellido: apellido.value,
    dni: auxDni,
    email: auxEmail,
    sexo: sexo.value,
    direccion: direccion.value,
    telefono1: auxTelefono1,
    telefono2: auxTelefono2,
    fechaNac: auxFechaNac,
    tipo: tipo.value,
  };

  try {
    await updateEmployee(employeeId, updatedEmployee);
    alertSuccess(`${updatedEmployee.nombre} ha sido modificado con éxito`);
  } catch (err) {
    console.log(err);
    alertWarning();
  }
}
