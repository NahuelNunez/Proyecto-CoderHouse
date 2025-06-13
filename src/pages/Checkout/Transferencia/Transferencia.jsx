import { useContext, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { CartContext } from "../../../components/context/CartContext";

export const Transferencia = () => {
  const { handleContinuar } = useOutletContext();

  const navigate = useNavigate();

  const {
    formdata,

    totalWidget,
    handleOnChange,
    handleSubmit,
    confirmar,
    handleOpen,
    menuForm,
    error,
  } = useContext(CartContext);

  console.log("Estamos en trasfer:", formdata);
  console.log("Confirmar:", confirmar);

  return (
    <div className="min-h-screen   flex flex-col  font-poppins  justify-center items-center ">
      {!menuForm ? (
        <div className="flex w-full justify-between items-center bg-black/90 p-8">
          {confirmar ? (
            <button
              onClick={handleContinuar}
              className="bg-sky-500 animate-bounce w-[240px] flex items-center gap-2 justify-center p-4 scale-90 hover:scale-100 transition-all ease-in-out hover:text-white text-black"
            >
              {" "}
              IR A RESUMEN{" "}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"
                  />
                </svg>
              </span>{" "}
            </button>
          ) : (
            <div className="flex flex-col justify-center items-centers gap-10 ">
              <h2 className="text-gray-400">
                VALOR A ABONAR:
                <span className="text-white"> {totalWidget()} ARS </span>
              </h2>
              <h2 className="text-gray-400">
                DEPOSITO: <span className="text-white">BANCO SANTANDER</span>
              </h2>
              <button
                onClick={handleOpen}
                className="bg-sky-500 flex items-center gap-4 scale-90 hover:scale-100 hover:text-white transition-all ease-in  w-[240px] p-4 text-black font-semibold"
              >
                SUBIR COMPROBANTE
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.3em"
                  height="1.3em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M8.71 7.71L11 5.41V15a1 1 0 0 0 2 0V5.41l2.29 2.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42l-4-4a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-4 4a1 1 0 1 0 1.42 1.42M21 12a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6a1 1 0 0 0-2 0v6a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1"
                  />
                </svg>
              </button>
            </div>
          )}
          <div className="flex flex-col gap-10">
            <h2>PAGO POR TRANSFERENCIA CVU/CBU O DEPOSITO BANCARIO</h2>
            <h2 className="text-gray-400">
              Titular de la cuenta:{" "}
              <span className="text-sm">Moreno Marina Natalia</span>{" "}
              <span className="text-sm">CUIT: 27-2539435-4</span>
            </h2>

            <h2 className="text-gray-400">
              Alias: <span className="text-white">CHAPA.CARDO.MIMO</span>{" "}
            </h2>
            <h2 className="text-gray-400">
              CBU: <span className="text-white">0720218888000032403572</span>{" "}
            </h2>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-black/90 w-full p-4 flex items-center flex-col gap-5"
        >
          <h2 className="text-center ">Subir comprobante</h2>
          <div className="flex flex-col items-center gap-10 text-sky-500">
            <div className="relative">
              <input
                type="text"
                placeholder="Nombre y apellido"
                name="nombreCompleto"
                onChange={handleOnChange}
                className="bg-transparent border-b-1 placeholder:text-[12px] placeholder:text-gray-600 border-b-gray-600 focus:border-b-white outline-none transition-all duration-300 ease-in-out"
              />
              {error.nombreCompleto && (
                <p className=" absolute top-8 text-red-500 text-[11px]">
                  {error.nombreCompleto}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                onChange={handleOnChange}
                placeholder="Correo Electronico"
                className="bg-transparent border-b-1 placeholder:text-[12px] placeholder:text-gray-600 border-b-gray-600 focus:border-b-white outline-none transition-all duration-300 ease-in-out"
              />
              {error.email && (
                <p className="absolute top-8 text-red-500 text-[11px]">
                  {error.email}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                type="number"
                name="telefono"
                onChange={handleOnChange}
                placeholder="Telefono"
                className="bg-transparent border-b-1 placeholder:text-[12px] placeholder:text-gray-600 border-b-gray-600 focus:border-b-white outline-none transition-all duration-300 ease-in-out"
              />
              {error.telefono && (
                <p className=" absolute top-8 text-red-500 text-[11px]">
                  {error.telefono}{" "}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                type="number"
                name="numeroTransferencia"
                placeholder="Numero transaccion"
                onChange={handleOnChange}
                className="bg-transparent border-b-1 placeholder:text-[12px] placeholder:text-gray-600 border-b-gray-600 focus:border-b-white outline-none transition-all duration-300 ease-in-out"
              />
              {error.numeroTransferencia && (
                <p className="absolute top-8 text-red-500 text-[11px]">
                  {error.numeroTransferencia}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="montoTotal"
                type="number"
                placeholder="Coloque monto sin puntos"
                onChange={handleOnChange}
                className="bg-transparent placeholder:text-[12px] border-b-1 placeholder:text-gray-600 border-b-gray-600 focus:border-b-white outline-none transition-all duration-300 ease-in-out"
              />
              {error.montoTotal && (
                <p className="absolute top-8 text-red-500 text-[11px]">
                  {error.montoTotal}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="file"
                className="text-sm text-white border-b border-gray-600 hover:text-sky-500 transition-all cursor-pointer"
              >
                {formdata.comprobanteURL
                  ? formdata.comprobanteURL.name
                  : "Subir Comprobante"}
              </label>
              <input
                name="comprobanteURL"
                type="file"
                id="file"
                accept="image/*"
                onChange={handleOnChange}
                className="bg-transparent border-b-1 hidden  border-b-gray-600 focus:border-b-white outline-none transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
          <div className="flex gap-14 w-full items-center justify-center">
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-sky-500 cursor-pointer hover:bg-sky-400 ease-in transition-all duration-200"
            >
              Enviar
            </button>
            <button
              className="px-4 py-2 rounded-full bg-red-500 cursor-pointer hover:bg-red-400 ease-in transition-all duration-200"
              onClick={handleOpen}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <h2 className="text-red-700 font-poppins  bg-black/90 px-4">
        <span className="animate-pulse ">
          {" "}
          Recorda que debes subir el comprobante o deposito de la transferencia
          para finalizar el pedido
        </span>
      </h2>
    </div>
  );
};
