import fondoImage from "../../images/fondo2.jpg";
export const Layout = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${fondoImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};
