const { createEmployee } = require('../../services/employees.service');
const { alertSuccess, alertWarning } = require('../../utils/swal');
const { navbar } = require('../../components/navbar');

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
formulario.addEventListener('submit', formHandler);
window.addEventListener('DOMContentLoaded', DOMLoadedHandler);

// Events functions
function DOMLoadedHandler() {
  nav.innerHTML = navbar(false);
}
async function formHandler(e) {
  e.preventDefault();
  //creo los auxiliares porque si lo hago con las constantes de arriba
  //al recargar la pagina los datos se quedan en memoria
  const auxDni = parseInt(dni.value);
  const auxTelefono1 = parseInt(telefono1.value);
  //estos if son para verficar lo que viene de la vista
  //si no tiene nada el campo, se guarda en la bd como nulo
  let auxTelefono2 = '';
  if (telefono2.value === '') {
    auxTelefono2 = null;
  }
  else {
    auxTelefono2 = parseInt(telefono2.value);
  }
  let auxEmail = '';
  if (email.value === '') {
    auxEmail = null;
  }

  //formato tipo fecha para guardar en la bd
  const auxFechaNac = new Date(fechaNac.value);

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
