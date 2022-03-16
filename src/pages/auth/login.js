const { alertMessage } = require('../../components/alertMessage');
const { alertWarning, alertSuccess } = require('../../utils/swal');
const { getUserByUsername } = require('../../services/user.service');

const alertContainer = document.getElementById('alert-message');
const loginForm = document.getElementById('login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');

loginForm.addEventListener('submit', formHandler);

async function formHandler(ev) {
  ev.preventDefault();

  const data = {
    username: username.value,
    password: password.value,
  };

  try {
    // llamar al service y validar
    const user = await getUserByUsername(data.username);
    console.log(data);

    // En caso de no existir el usuario es porque no existe un usuario con ese username
    if (!user) {
      alertContainer.innerHTML = alertMessage(
        'alert-danger',
        'Usuario o Contraseña inválido'
      );
      return;
    }

    const isValid = user.contrasenya === data.password;
    // En caso de que las contraseñas sean distintas
    if (!isValid) {
      alertContainer.innerHTML = alertMessage(
        'alert-danger',
        'Usuario o Contraseña inválido'
      );
      return;
    }

    // Caso exitoso
    alertSuccess(`Bienvenido ${user.nombre}`);
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = '../home/home.html';
  } catch (error) {
    console.log(error);
    alertWarning();
  }
}
