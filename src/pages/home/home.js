const Swal = require('sweetalert2');

const button = document.getElementById('button');
button.addEventListener('click', () => {
  Swal.fire('Good job!', 'You clicked the button!', 'success');
});
