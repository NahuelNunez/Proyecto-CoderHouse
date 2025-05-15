import fondoImage from "../../images/fondo2.jpg";
import { UserLocalStorage } from "../Admin/UserLocalStorage";

export const Layout = ({ children }) => {
  UserLocalStorage();
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
