const getCurrentUser = () => {
  const currentUser = localStorage.getItem('currentUser');
  return JSON.parse(currentUser);
};

module.exports = { getCurrentUser };
