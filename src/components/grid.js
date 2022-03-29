const { Grid, h } = require('gridjs');
const { deleteEmployee } = require('../services/employees.service');
const {
  alertSuccess,
  alertWarning,
  alertConfirmation,
} = require('../utils/swal');

// Idioma de los textos del grid
const localeEs = {
  search: {
    placeholder: 'Escribe una letra...',
  },
  pagination: {
    previous: 'Anterior',
    next: 'Siguiente',
    navigate: (page, pages) => `Pagina ${page} de ${pages}`,
    page: (page) => `Pagina ${page}`,
    showing: 'Mostrando del',
    of: 'de',
    to: 'al',
    results: 'resultados',
  },
  loading: 'Cargando...',
  noRecordsFound: 'No hay empleados cargados',
  error: 'Un error ocurrió, contacte con el adminstrador',
};

// Definicion de las columnas de la tabla
const columns = [
  { name: 'id', hidden: true },
  { name: 'Nombre' },
  { name: 'Apellido' },
  {
    name: 'Estado',
    formatter: (cell) =>
      h(
        'div',
        {
          className: `badge bg-${cell === 'ALTA' ? 'success' : cell === 'PROCESO' ? 'warning' : 'danger'
            } w-100 d-flex align-items-center justify-content-center`,
          style: 'height:30px;',
        },
        cell
      ),
  },
  { name: 'DNI' },
  { id: 'tipoEmpleado', name: 'Tipo de Empleado' },
  // action buttons
  {
    name: 'Ver más',
    formatter: (_cell, row) => {
      return h(
        'button',
        {
          className: 'btn btn-primary w-100',
          onClick: () => moreInfo(row),
        },
        'Ver más'
      );
    },
  },
];

// Definicion de las funciones de los botones de la tabla
const deleteCell = async (row) => {
  const id = row.cells[0].data;
  const employeeName = row.cells[1].data;

  const result = await alertConfirmation(
    `¿Estás seguro de eliminar a ${employeeName}?`
  );

  if (result.isConfirmed) {
    try {
      await deleteEmployee(id);
      await alertSuccess(`${employeeName} fue eliminado con éxito`);
      location.reload();
    } catch (error) {
      console.log(error);
      alertWarning();
    }
  }
};

const updateCell = async (row) => {
  const id = row.cells[0].data;
  localStorage.setItem('id', id);
  window.location.href = '../employees/form-edit.html';
};

const moreInfo = (row) => {
  const id = row.cells[0].data;
  localStorage.setItem('employee-id', id);
  window.location.href = '../employees/employee.html';
};

// Generacion de la tabla
const generateGrid = (data) => {
  return new Grid({
    columns,
    search: {
      enabled: true,
    },
    sort: true,
    data: data,
    pagination: {
      enabled: true,
      limit: 5,
      summary: true,
    },
    style: {
      table: {
        width: '100%',
      },
    },
    language: localeEs,
  });
};

module.exports = { generateGrid };
