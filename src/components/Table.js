const table = (employee) => {
  return `
        <tr>
          <th scope="row">${employee.nombre}</th>
          <td>${employee.apellido}</td>
          <td>${employee.creado}</td>
        </tr>
    `;
};

module.exports = {
  table,
};
