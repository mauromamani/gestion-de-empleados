const { navbar } = require('../../components/navbar');
const { getEmployeeById } = require('../../services/employees.service');
const { formatDateNac, formatDate } = require('../../utils/formatDate');
const { getCurrentUser } = require('../../utils/getCurrentUser');
const {
  alertConfirmation,
  alertSuccess,
  alertWarning,
} = require('../../utils/swal');
const { deleteEmployee } = require('../../services/employees.service');
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
const creado = document.getElementById('creado');
const estado = document.getElementById('estado');
const fechaEstado = document.getElementById('fechaEstado');
const nav = document.getElementById('navbar');
const botonModificar = document.getElementById('modificar');
const fotoPerfil = document.getElementById('fotoPerfil');
const fotoDni1 = document.getElementById('fotoDni1');
const fotoDni2 = document.getElementById('fotoDni2');
const botonEliminar = document.getElementById('eliminar');
const divEliminar = document.getElementById('divEliminar');
window.addEventListener('DOMContentLoaded', DOMLoadedHandler);
const employeeId = localStorage.getItem('employee-id');
async function DOMLoadedHandler() {
  const currentUser = getCurrentUser();
  nav.innerHTML = navbar(false);
  const employee = await getEmployeeById(parseInt(employeeId));
  // console.log(employee);
  //cuando se aprieta en modificar se manda el id del empleado al formulario
  //para modificarlo
  botonModificar.onclick = modificar;
  function modificar() {
    localStorage.setItem('id', employee.id);
    window.location.href = '../employees/form-edit.html';
  }
  // Acá se carga la información a mostrar en el HTML
  nombre.innerHTML = employee.nombre;
  apellido.innerHTML = employee.apellido;
  dni.innerHTML = employee.dni;
  email.innerHTML = employee.email ? employee.email : '-';
  sexo.innerHTML = employee.sexo;
  direccion.innerHTML = employee.direccion;
  telefono1.innerHTML = employee.telefono1;
  telefono2.innerHTML = employee.telefono2 ? employee.telefono2 : '-';
  fechaNac.innerHTML = formatDateNac(employee.fechaNac);
  tipo.innerHTML = employee.tipo;
  creado.innerHTML = formatDate(employee.creado);
  estado.innerHTML =
    employee.estado === 'ALTA'
      ? `<h5 style="color: #00bc8c;">${employee.estado}</h5>`
      : employee.estado === 'PROCESO'
        ? `<h5 style="color: #f39c12;">${employee.estado}</h5>`
        : employee.estado === 'BAJA'
          ? `<h5 style="color: #e74c3c;">${employee.estado}</h5>`
          : '';
  //formateo de fecha Alta
  fechaEstado.innerHTML = employee.fechaAlta ? formatDateNac(employee.fechaAlta) : '-';

  // fotoPerfil.innerHTML = employee.imgPerfil.toString('base64');
  fotoPerfil.innerHTML = employee.imgPerfil
    ? `<img src="data:image/jpeg;base64,${employee.imgPerfil.toString(
      'base64'
    )}" class="img-fluid rounded" style="width: 350px; height: 200px" /> `
    : null;
  fotoDni1.innerHTML = employee.imgDniFrontal
    ? `<img src="data:image/jpeg;base64,${employee.imgDniFrontal.toString(
      'base64'
    )}"  style="width: 350px; height: 200px;" /> `
    : null;
  fotoDni2.innerHTML = employee.imgDniTrasera
    ? `<img src="data:image/jpeg;base64,${employee.imgDniTrasera.toString(
      'base64'
    )}"  style="width: 350px ; height: 200px;" /> `
    : null;
  if (currentUser.rol === 'ADMIN') {
    divEliminar.style.display = "block";
  }
  botonEliminar.onclick = eliminar;
  async function eliminar() {
    const result = await alertConfirmation(`Seguro de que quiere eliminar a ${employee.nombre} ?`, null);
    if (result.isConfirmed) {
      try {
        await deleteEmployee(employee.id);
        await alertSuccess(`El empleado fue eliminado con exito`);
        window.location.href = '../home/home.html';
      }
      catch (error) {
        console.log(error);
        alertWarning();
      }

    }

  }
}
