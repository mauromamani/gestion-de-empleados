const {
  updateEmployee,
  getEmployeeById,
} = require('../../services/employees.service');
const { alertSuccess, alertWarning } = require('../../utils/swal');
const { navbar } = require('../../components/navbar');
const { formatDateIso } = require('../../utils/formatDate');
const { formatTel, formatEmail } = require('../../utils/formatData');
const { validateImageSize, validateImage } = require('../../utils/validator');
const { blobToBase64, base64ToBuffer } = require('../../utils/blobManager');
const { getCurrentUser } = require('../../utils/getCurrentUser');

// obtenemos el id de localstorage y lo convertimos a int
const employeeId = parseInt(localStorage.getItem('id'));

// Html ref's
const formulario = document.getElementById('formulario');
const divEstado = document.getElementById('divEstado');
const divFechaAlta = document.getElementById('divFechaAlta');
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
const fotoPerfil = document.getElementById('fotoPerfil');
const fotoDni1 = document.getElementById('fotoDni1');
const fotoDni2 = document.getElementById('fotoDni2');
const estado = document.getElementById('estado');
const fechaAlta = document.getElementById('fechaAlta');
// imagenes
const imgPerfil = document.getElementById('img-perfil');
const imgDniFrontal = document.getElementById('img-dni-frontal');
const imgDniTrasera = document.getElementById('img-dni-trasero');
const botonAtras = document.getElementById('atras');
// Events
window.addEventListener('DOMContentLoaded', DOMLoadedHandler);
formulario.addEventListener('submit', formHandler);

// Events functions
async function DOMLoadedHandler() {
  //boton volver
  botonAtras.onclick = atras;
  function atras() {
    localStorage.setItem('id', employee.id);
    window.location.href = './employee.html';
  }
  nav.innerHTML = navbar(false);
  const currentUser = getCurrentUser();
  if (currentUser.rol === 'ADMIN') {
    divEstado.style.display = "block";
    divFechaAlta.style.display = "block";
  }
  const employee = await getEmployeeById(employeeId);
  const auxFechaAlta = employee.fechaAlta ? formatDateIso(employee.fechaAlta) : "";
  nombre.value = employee.nombre;
  apellido.value = employee.apellido;
  dni.value = employee.dni;
  email.value = employee.email;
  sexo.value = employee.sexo;
  direccion.value = employee.direccion;
  telefono1.value = employee.telefono1;
  telefono2.value = employee.telefono2;
  estado.value = employee.estado;
  fechaNac.value = formatDateIso(employee.fechaNac);
  fechaAlta.value = auxFechaAlta;
  tipo.value = employee.tipo;

  fotoPerfil.innerHTML = employee.imgPerfil ? `<img src="data:image/jpeg;base64,${employee.imgPerfil.toString('base64')}" class="img-fluid rounded" style="height: 200px; width: 230px;" /> ` : null;
  fotoDni1.innerHTML = employee.imgDniFrontal ? `<img src="data:image/jpeg;base64,${employee.imgDniFrontal.toString('base64')}"  style="width: 350px ; height: 200px;" /> ` : null;
  fotoDni2.innerHTML = employee.imgDniTrasera ? `<img src="data:image/jpeg;base64,${employee.imgDniTrasera.toString('base64')}"  style="width: 350px ; height: 200px;" /> ` : null;

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
  const auxFechaAlta = fechaAlta ? new Date(fechaAlta.value) : null;
  console.log(auxFechaAlta);
  // Validacion del tamaño de las imagenes
  // Se realizan 3 validaciones distintas para dar al usuario un mensaje mas claro
  if (validateImageSize(imgPerfil)) {
    alertWarning('La imagen de perfil no debe superar el tamaño máximo de 2MB');
    return;
  }

  if (validateImageSize(imgDniFrontal)) {
    alertWarning(
      'La imagen del DNI frontal no debe superar el tamaño máximo de 2MB'
    );
    return;
  }

  if (validateImageSize(imgDniTrasera)) {
    alertWarning(
      'La imagen del DNI trasero no debe superar el tamaño máximo de 2MB'
    );
    return;
  }

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
    fechaAlta: auxFechaAlta,
    estado: estado.value,
  };
  updatedEmployee.fechaAlta = updatedEmployee.estado === 'ALTA' ? auxFechaAlta : null;

  // Conversion de las imagenes a base64 y blob
  // En caso de que la validacion sea correcta se agrega al objeto updatedEmployee los campos necesarios para la imagen
  if (validateImage(imgPerfil)) {
    updatedEmployee.imgPerfil = await base64ToBuffer(imgPerfil);
  }

  if (validateImage(imgDniFrontal)) {
    updatedEmployee.imgDniFrontal = await base64ToBuffer(imgDniFrontal);
  }

  if (validateImage(imgDniTrasera)) {
    updatedEmployee.imgDniTrasera = await base64ToBuffer(imgDniTrasera);
  }

  try {
    await updateEmployee(employeeId, updatedEmployee);
    await alertSuccess(`${updatedEmployee.nombre} ha sido modificado con éxito`);
    location.reload();
  } catch (err) {
    console.log(err);
    alertWarning();
  }
}

