const { createEmployee } = require('../../services/employees.service');
const { alertSuccess, alertWarning } = require('../../utils/swal');
const { navbar } = require('../../components/navbar');
const { formatTel, formatEmail } = require('../../utils/formatData');
const { validateImageSize, validateImage } = require('../../utils/validator');
const { base64ToBuffer } = require('../../utils/blobManager');
const { getCurrentUser } = require('../../utils/getCurrentUser');

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
const estado = document.getElementById('estado');
const fechaAlta = document.getElementById('fechaAlta');
// imagenes
const imgPerfil = document.getElementById('img-perfil');
const imgDniFrontal = document.getElementById('img-dni-frontal');
const imgDniTrasera = document.getElementById('img-dni-trasero');

// Events
formulario.addEventListener('submit', formHandler);
window.addEventListener('DOMContentLoaded', DOMLoadedHandler);

// Events functions
function DOMLoadedHandler() {
  nav.innerHTML = navbar(false, 'form-create');
  const currentUser = getCurrentUser();
  if (currentUser.rol === 'ADMIN') {
    divEstado.style.display = "block";
    divFechaAlta.style.display = "block";
  }
}

async function formHandler(e) {
  e.preventDefault();
  //parse de datos para guardar a la db de forma correcta
  const auxDni = parseInt(dni.value);
  const auxTelefono1 = parseInt(telefono1.value);
  const auxTelefono2 = formatTel(telefono2.value);
  const auxEmail = formatEmail(email.value);
  // Formato tipo fecha para guardar en la bd
  const auxFechaNac = new Date(fechaNac.value);
  const auxFechaAlta = fechaAlta ? new Date(fechaAlta.value) : null;

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

  const nuevoEmpleado = {
    nombre: nombre.value,
    apellido: apellido.value,
    tipo: tipo.value,
    dni: auxDni,
    email: auxEmail,
    sexo: sexo.value,
    direccion: direccion.value,
    telefono1: auxTelefono1,
    telefono2: auxTelefono2,
    fechaNac: auxFechaNac,
    fechaAlta: auxFechaAlta,
    estado: estado.value,
  };
  nuevoEmpleado.fechaAlta = nuevoEmpleado.estado === 'ALTA' ? auxFechaAlta : null;
  //probando xd
  // if (nuevoEmpleado.estado === 'ALTA') {
  //   nuevoEmpleado.fechaAlta = auxFechaAlta;
  // }
  // else {
  //   nuevoEmpleado.fechaAlta = null;
  // }
  if (validateImage(imgPerfil)) {
    nuevoEmpleado.imgPerfil = await base64ToBuffer(imgPerfil);
  }

  if (validateImage(imgDniFrontal)) {
    nuevoEmpleado.imgDniFrontal = await base64ToBuffer(imgDniFrontal);
  }

  if (validateImage(imgDniTrasera)) {
    nuevoEmpleado.imgDniTrasera = await base64ToBuffer(imgDniTrasera);
  }

  try {
    await createEmployee(nuevoEmpleado);

    // Restablecer valores iniciales
    //acá restablezco los valores del objeto html directamente
    //y no de las constantes porque quedaban en memoria si las ponia en nulo
    //es para que se borre todo el formulario una vez que se carga
    nombre.value = '';
    apellido.value = '';
    tipo.value = '';
    dni.value = '';
    email.value = '';
    sexo.value = '';
    direccion.value = '';
    telefono1.value = '';
    telefono2.value = '';
    fechaNac.value = '';
    imgPerfil.value = '';
    imgDniFrontal.value = '';
    imgDniTrasera.value = '';
    estado.value = '';
    fechaAlta.value = '';
    alertSuccess(`${nuevoEmpleado.nombre} ha sido creado con éxito`);
  } catch (err) {
    console.log(err);
    alertWarning();
  }
}
