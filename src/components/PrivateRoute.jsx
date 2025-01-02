const PrivateRoute = ({ element, ...rest }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (!currentUser || currentUser.role !== "admin") {
    console.log(currentUser.role);
    return (window.location.href = "/error");
  }

  return element;
};

export default PrivateRoute;
