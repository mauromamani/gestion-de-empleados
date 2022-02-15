const { Grid } = require('gridjs');

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

const generateGrid = (data) => {
  return new Grid({
    columns: ['Nombre', 'Apellido', 'Creado'],
    search: {
      enabled: true,
    },
    sort: true,
    data: data,
    pagination: {
      enabled: true,
      limit: 6,
      summary: false,
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
