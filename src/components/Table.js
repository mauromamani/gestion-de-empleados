const table = (employee) => {
  return `
      <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">${employee.nombre}</th>
          <td>${employee.apellido}</td>
          <td>${employee.creado}</td>
        </tr>
      </tbody>
    </table>
  

    `;
};

module.exports = {
  table,
};
