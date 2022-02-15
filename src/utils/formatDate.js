//funcion que formatea la fecha del objeto que recibe
const formatDate = (date) => {
  let formattedDate =
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  return formattedDate;
};

module.exports = { formatDate };
