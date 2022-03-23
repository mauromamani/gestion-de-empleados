const { createEmployee } = require('../../services/employees.service');
const { alertSuccess, alertWarning } = require('../../utils/swal');
const { navbar } = require('../../components/navbar');
const { formatTel, formatEmail } = require('../../utils/formatData');
const { validateImageSize } = require('../../utils/validator');

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
// imagenes
const imgPerfil = document.getElementById('img-perfil');
const imgDniFrontal = document.getElementById('img-dni-frontal');
const imgDniTrasero = document.getElementById('img-dni-trasero');

// Events
formulario.addEventListener('submit', formHandler);
window.addEventListener('DOMContentLoaded', DOMLoadedHandler);

// Events functions
function DOMLoadedHandler() {
  nav.innerHTML = navbar(false, 'form-create');
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

  if (validateImageSize(imgDniTrasero)) {
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
  };

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
    alertSuccess(`${nuevoEmpleado.nombre} ha sido creado con éxito`);
  } catch (err) {
    console.log(err);
    alertWarning();
  }
}
