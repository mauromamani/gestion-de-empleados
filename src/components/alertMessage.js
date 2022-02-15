const alertMessage = (alert, message) => {
  return `
    <div class="alert ${alert} text-center fw-bold">${message}</div>
  `;
};

module.exports = { alertMessage };
