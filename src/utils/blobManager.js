// blobToBase64: convierte un file a base64
const blobToBase64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result.split(',')[1]);
    };
  });
};

module.exports = { blobToBase64 };
