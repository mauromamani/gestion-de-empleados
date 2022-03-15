const loginForm = document.getElementById('login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');

loginForm.addEventListener('submit', formHandler);

async function formHandler(ev) {
  ev.preventDefault();

  console.log({ u: username.value, p: password.value });
  // llamar al service y validar
}
