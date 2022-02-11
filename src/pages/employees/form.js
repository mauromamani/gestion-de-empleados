const { createEmployee } = require('../../services/employees.service');
const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');



formulario.addEventListener('submit', async (e) => {
  //este lo puse para que detenga la recarga cuando haces el submit
  e.preventDefault();

  /*if (!nombre.value.trim()) {
    alerta.textContent = 'campos obligatorios';
    alerta.style.display = 'block';
    return;
  }*/

  const nuevoEmpleado = {
    nombre: nombre.value,
    apellido: apellido.value,
  }
  try {
    await createEmployee(nuevoEmpleado);
    nombre.value = '';
    apellido.value = '';
    console.log('Empleado creado');
  }
  catch (err) {
    //mostrar alerta de error de carga
    console.log('error');
  }

  //console.log(nuevoEmpleado);
  //return nuevoEmpleado;
})






/*const enviarEmpleado = (nuevoEmpleado) => {
  console.log(nuevoEmpleado);
}*/
