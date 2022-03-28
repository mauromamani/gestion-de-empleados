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

const base64ToBuffer = async (file) => {
  const imgBase64 = await blobToBase64(file.files[0]);
  const imgBuffer = Buffer.from(imgBase64, 'base64url');

  return imgBuffer;
};

module.exports = { blobToBase64, base64ToBuffer };
