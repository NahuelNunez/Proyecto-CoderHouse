import { useContext, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { CartContext } from "../../../components/context/CartContext";

export const MetodoPago = () => {
  const { handleContinuar, pasoActual, setPasoActual } = useOutletContext();
  const navigate = useNavigate();
  const { handleOnChange } = useContext(CartContext);

  const handleAdd = (e) => {
    handleOnChange(e);
    handleContinuar();
  };

  useEffect(() => {
    if (pasoActual === "metodoPago") {
      setPasoActual("entrega");
    } else {
      navigate(`/Productos`);
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <div className="flex flex-wrap lg:flex-row justify-center items-center gap-5">
        <button className="lg:h-60 lg:w-64 h-40 w-40 bg-black cursor-not-allowed hover:bg-black/90 p-4 text-white  font-semibold transition-all duration-200 ease-in-out rounded-xl">
          Tarjeta de debito
        </button>
        <button className="lg:h-60 lg:w-64 bg-black p-4 h-40 w-40 cursor-not-allowed hover:bg-black/90 text-white font-semibold transition-all duration-200 ease-in-out rounded-xl">
          Tarjeta de credito
        </button>
        <button
          value="Transferencia"
          name="metodoPago"
          onClick={handleAdd}
          className="lg:h-60 lg:w-64 h-40 w-40 font-bold hover:text-white bg-sky-500 p-4 hover:bg-sky-400 transition-all duration-200 ease-in-out rounded-xl hover:after:"
        >
          Transferencias CVU o deposito bancario CBU
        </button>
      </div>
    </div>
  );
};
