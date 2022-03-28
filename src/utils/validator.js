// validateImageSize: Retorna true si el tamaño supera la constante maxima declarada (2MB)
const validateImageSize = (image) => {
  const maxSizeInBytes = 2097152;

  // Se valida que exista el elemento antes de hacer la validación del tamaño
  if (
    image.files &&
    image.files.length === 1 &&
    image.files[0].size > maxSizeInBytes
  ) {
    return true;
  }

  return false;
};

const validateImage = (image) => {
  if (image.files && image.files.length === 1) {
    return true;
  }

  return false;
};

module.exports = { validateImageSize, validateImage };
