import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Admin/Store/useAuth";
import { Login } from "../Admin/Login";
import { Productos } from "../../pages/Productos";
import { useEffect } from "react";

export const RutaProtegida = ({ children, roleRequired }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      return navigate(`/`);
    }

    if (roleRequired && user?.rol !== roleRequired) {
      return navigate(`/Productos`);
    }
  }, [user, roleRequired, navigate]);

  if (
    (roleRequired && user?.rol === "admin") ||
    user?.rol === "superadmin" ||
    user?.rol === "user"
  ) {
    return children;
  }

  return children;
};
