const PrivateRoute = ({ element, ...rest }) => {
  const currentUser = JSON.parse(localStorage.getItem("user")); // Mengambil user dari localStorage

  if (!currentUser || currentUser.role !== "admin") {
    return (window.location.href = "/error");
  }

  return element;
};

export default PrivateRoute;
