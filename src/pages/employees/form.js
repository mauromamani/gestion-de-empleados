const formulario = document.getElementById('formulario');

const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const tipo = document.getElementById('tipo');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const nuevoEmpleado = {
    nombre: nombre.value,
    apellido: apellido.value,
    tipo: tipo.value
  }
  console.log(nuevoEmpleado);
  //return nuevoEmpleado;
});

/*const enviarEmpleado = (nuevoEmpleado) => {
  console.log(nuevoEmpleado);
}*/
