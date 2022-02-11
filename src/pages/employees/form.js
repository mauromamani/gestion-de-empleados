const { createEmployee } = require('../../services/employees.service');
const formulario = document.getElementById('formulario');

const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');

formulario.addEventListener('submit', (e) => {
  //este lo puse para que detenga la recarga cuando haces el submit
  e.preventDefault();
  const nuevoEmpleado = {
    nombre: nombre.value,
    apellido: apellido.value,
  }
  createEmployee(nuevoEmpleado);
  nombre.value = '';
  apellido.value = '';
  console.log('Empleado creado');
  //console.log(nuevoEmpleado);
  //return nuevoEmpleado;
});

/*const enviarEmpleado = (nuevoEmpleado) => {
  console.log(nuevoEmpleado);
}*/
