const formatTel = (tel2) => {
  if (tel2 === '') {
    return tel2 = null;
  }
  else {
    return parseInt(tel2);
  }
}
const formatEmail = (email) => {
  if (email === '') {
    return email = null;
  }
  else {
    return email;
  }
}
module.exports = {
  formatTel,
  formatEmail,
}