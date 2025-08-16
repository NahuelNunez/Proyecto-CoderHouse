import { useNavigate } from "react-router-dom";
import { useAuth } from "../Admin/Store/useAuth";

import { useEffect } from "react";

export const RutaProtegida = ({ children, roleRequired, roleRequired2 }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      return navigate(`/`);
    }

    if (
      roleRequired &&
      user?.rol !== roleRequired &&
      user?.rol !== roleRequired2
    ) {
      return navigate(`/Productos`);
    }
  }, [user, roleRequired, navigate]);

  if (
    (roleRequired && user?.rol === "admin") ||
    user?.rol === "superadmin" ||
    user?.rol === "user" ||
    user?.rol === "operador"
  ) {
    return children;
  }

  return children;
};
