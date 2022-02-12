const table = (employee) => {
  return `
        <tr>
          <td>${employee.nombre}</td>
          <td>${employee.apellido}</td>
          <td>${employee.nombre}</td>
          <td>
            <button class="btn btn-secondary">Modificar</button>
          </td>
          <td>
            <button class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
    `;
};

module.exports = {
  table,
};
