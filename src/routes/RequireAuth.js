export default function RequireAuth({ element, ...rest }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (!currentUser || currentUser.role !== "admin") {
    return (window.location.href = "/unauthorized");
  }

  return element;
}
