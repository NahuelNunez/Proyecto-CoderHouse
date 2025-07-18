import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Admin/Store/useAuth";
import { Login } from "../Admin/Login";
import { Productos } from "../../pages/Productos";

export const RutaProtegida = ({ children, roleRequired }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user === null) {
    return navigate(`/login`);
  }

  if (roleRequired && user.rol !== roleRequired) {
    return navigate(`/Productos`);
  }

  if (
    (roleRequired && user.rol === "admin") ||
    user.rol === "superadmin" ||
    user.rol === "user"
  ) {
    return children;
  }

  return children;
};
