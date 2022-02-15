const { Grid, h } = require('gridjs');
const Swal = require('sweetalert2');
const { deleteEmployee } = require('../services/employees.service');

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
  { name: 'Creado' },
  // action buttons
  {
    name: 'Modificar',
    formatter: (_cell, row) => {
      return h(
        'button',
        {
          className: 'btn btn-warning w-100',
          onClick: () => updateCell(row),
        },
        'Modificar'
      );
    },
  },
  {
    name: 'Eliminar',
    formatter: (_cell, row) => {
      return h(
        'button',
        {
          className: 'btn btn-danger w-100',
          onClick: () => deleteCell(row),
        },
        'Eliminar'
      );
    },
  },
];

// Definicion de las funciones de los botones de la tabla
const deleteCell = async (row) => {
  const id = row.cells[0].data;
  const employeeName = row.cells[1].data;

  const result = await Swal.fire({
    title: `¿Estás seguro de eliminar a ${employeeName}?`,
    text: 'Los cambios no pueden ser deshechos',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, quiero eliminarlo',
  });

  if (result.isConfirmed) {
    try {
      await deleteEmployee(id);
      await Swal.fire(
        'Eliminado!',
        `${employeeName} fue eliminado con éxito`,
        'success'
      );
      location.reload();
    } catch (error) {
      console.log(error);
      Swal.fire(
        'Error en la ejecución de esta acción',
        'Por favor contacte con el administrador',
        'warning'
      );
    }
  }
};

const updateCell = async (row) => {
  const id = row.cells[0].data;
  localStorage.setItem('id', id);
  window.location.href = '../employees/updateForm.html';
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
      limit: 6,
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
