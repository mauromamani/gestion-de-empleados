//funcion que formatea la fecha del objeto que recibe
const formatDate = (date) => {
  if (date) {
    let formattedDate =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    return formattedDate;
  }
  else {
    return "";
  }
};
const formatDateNac = (date) => {
  if (date) {
    let formattedDate =
      (date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    return formattedDate;
  }
  else {
    return "";
  }
};
const formatDateIso = (date) => {
  if ((date.getMonth() + 1) >= 10) {
    let formattedDate =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1);
    return formattedDate.toString();
  }
  else {
    let formattedDate =
      date.getFullYear() + '-' + '0' + (date.getMonth() + 1) + '-' + (date.getDate() + 1);
    return formattedDate.toString();
  }
}
module.exports = { formatDate, formatDateIso, formatDateNac };
