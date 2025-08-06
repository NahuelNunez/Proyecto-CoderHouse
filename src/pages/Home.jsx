import { Link } from "react-router-dom";
import Welcome from "../components/Welcome";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Home | Chelitas Joyas";
  }, []);

  return (
    <div className=" min-h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center mt-24 gap-10">
        <h2 className="uppercase font-playfair text-[40px] text-center  text-white">
          Joyería Exclusiva
        </h2>
        <p className="text-sm text-gray-300 ">
          Descubre piezas unicas que cuentan tu historia
        </p>
        <Link
          to="/Productos"
          className="uppercase text-sm text-white p-4  rounded-lg bg-sky-500 font-semibold hover:bg-transparent border border-sky-500 hover:text-white hover:font-semibold transition-all ease-in-out duration-300"
        >
          ver coleccion
        </Link>
      </div>

      <Welcome />
    </div>
  );
};

export default Home;
