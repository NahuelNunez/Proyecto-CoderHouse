import { useEffect } from "react";
import { useAuth } from "../components/Admin/Store/useAuth";

export const UserLocalStorage = () => {
  const { loadUserFromLocalStorage } = useAuth();
  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);
};
