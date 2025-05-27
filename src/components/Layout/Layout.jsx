import { useEffect, useState } from "react";
import fondoImage from "../../images/fondo2.jpg";
import { UserLocalStorage } from "../Admin/UserLocalStorage";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;
export const Layout = ({ children }) => {
  const [sessionId, setSessionId] = useState("");
  UserLocalStorage();

  useEffect(() => {
    const getSession = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/session`, {
          withCredentials: true,
        });

        setSessionId(response.data.sessionId);
      } catch (error) {
        console.log("Error al obtener la sesion", error);
      }
    };
    getSession();
  }, []);

  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url(${fondoImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="absoloute inset-0 bg-black/50">{children}</div>
    </div>
  );
};
