const alertMessage = (alert, message) => {
  return `
    <div class="alert ${alert} text-center fw-bold my-2">${message}</div>
  `;
};

module.exports = { alertMessage };
