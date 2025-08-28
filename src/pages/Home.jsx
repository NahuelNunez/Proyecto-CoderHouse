import { Link } from "react-router-dom";
import Welcome from "../components/Welcome";
import { useEffect } from "react";

const arrowDown = (
  <svg
    className="text-amber-400 animate-bounce"
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m12 22l-7-7l1.4-1.425l4.6 4.6V11h2v7.175l4.6-4.575L19 15zM11 9V6h2v3zm0-5V2h2v2z"
    />
  </svg>
);

const Home = () => {
  useEffect(() => {
    document.title = "Home | Chelitas Joyas";
  }, []);

  return (
    <div className=" min-h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center mt-24 gap-10">
        <h2 className="text-[40px] text-white uppercase text-center font-playfair">
          ¡Descubrí el brillo de la elegancia con{" "}
          <span className="text-[40px] text-sky-500">Chelitas Joyas</span>!
        </h2>
        <p className="mx-1 text-white text-2xl">
          Encontrá la joya ideal con{" "}
          <span className="text-amber-400">calidad</span>,{" "}
          <span className="text-amber-400">exclusividad</span>{" "}
          <span className="text-amber-400">
            y el mejor servicio personalizado.
          </span>
        </p>
        {arrowDown}
        <Link
          to="/Productos"
          className="uppercase text-xl   nahuel mb-10 p-8 text-white md:p-6  lg:p-6 text-center  rounded-lg bg-sky-500 font-semibold hover:bg-transparent border border-sky-500 hover:text-white hover:font-semibold transition-all ease-in-out duration-300"
        >
          ver coleccion
        </Link>
      </div>

      <Welcome />
    </div>
  );
};

export default Home;
