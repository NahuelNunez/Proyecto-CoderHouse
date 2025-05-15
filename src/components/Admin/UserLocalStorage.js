import { useEffect } from "react";
import { useAuth } from "./Store/useAuth";

export const UserLocalStorage = () => {
  const { loadUserFromLocalStorage } = useAuth();
  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);
};
