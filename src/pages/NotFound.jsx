import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="text-center min-h-screen flex flex-col justify-center items-center p-10">
      <div className="mx-auto bg-white p-8 flex flex-col gap-2 max-w-md w-full rounded-xl border-3 shadow-xl border-red-600">
        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <h2 className="mt-4  font-poppins text-red-600 text-xl">
          Página no encontrada
        </h2>
        <p className="font-poppins text-gray-500 text-lg">
          Lo sentimos, pero la página que buscas no existe o ha sido movida.
        </p>
        <p className="font-poppins text-gray-500 text-lg">
          Puede que el enlace esté roto o la dirección haya cambiado. Usa los
          botones de abajo para volver a explorar.
        </p>
        <Link
          to={"/"}
          className="bg-red-600 rounded-full px-2 py-2 mt-3 text-white font-poppins hover:bg-red-500"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};
