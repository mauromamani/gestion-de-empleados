const navbar = (exportar) => {
  return `<div class="container-fluid">
  <a class="navbar-brand">Control de Empleados</a>
  <ul class="nav">
    <li class=" nav-item">
      <a class="nav-link text-white d-flex align-items-center" href="../home/home.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-people-fill"
          viewBox="0 0 16 16">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path fill-rule="evenodd"
            d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
          <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
        </svg>
        <span class="d-block mx-2">Lista de Empleados</span>
      </a>
    </li>
    <li class=" nav-item">
      <a class="nav-link text-white d-flex align-items-center" href="../employees/form-create.html">
        <!--ico-->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
          class="bi bi-person-plus-fill" viewBox="0 0 16 16">
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path fill-rule="evenodd"
            d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
        </svg>
        <span class="d-block mx-2">Cargar Empleado</span>
      </a>
    </li>
    ${exportar ? `<li class="nav-item">
    <a class="nav-link text-white d-flex align-items-center" id="exportar" href="#">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
      </svg>
      <span class="d-block mx-2">Exportar Tabla</span>
    </a>
  </li> `: ''}
  </ul>
</div>`
}
module.exports = {
  navbar
}