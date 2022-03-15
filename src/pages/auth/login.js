const { alertMessage } = require('../../components/alertMessage');

const alertContainer = document.getElementById('alert-message');
const loginForm = document.getElementById('login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');

loginForm.addEventListener('submit', formHandler);

async function formHandler(ev) {
  ev.preventDefault();

  console.log({ u: username.value, p: password.value });
  // llamar al service y validar

  const user = true;
  if (user) {
    window.location.href = '../home/home.html';
    return;
  }

  alertContainer.innerHTML = alertMessage(
    'alert-danger',
    'Usuario o Contraseña inválido'
  );
}
