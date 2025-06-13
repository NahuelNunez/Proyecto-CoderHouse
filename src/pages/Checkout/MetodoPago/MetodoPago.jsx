import { useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { CartContext } from "../../../components/context/CartContext";

export const MetodoPago = () => {
  const { handleContinuar } = useOutletContext();

  const { handleOnChange } = useContext(CartContext);

  const handleAdd = (e) => {
    handleOnChange(e);
    handleContinuar();
  };
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <div className="flex justify-center items-center gap-5">
        <button className="h-60 w-64 bg-black cursor-not-allowed hover:bg-black/90 p-4 text-white  font-semibold transition-all duration-200 ease-in-out rounded-xl">
          Tarjeta de debito
        </button>
        <button className="h-60 w-64 bg-black p-4 cursor-not-allowed hover:bg-black/90 text-white font-semibold transition-all duration-200 ease-in-out rounded-xl">
          Tarjeta de credito
        </button>
        <button
          value="Transferencia"
          name="metodoPago"
          onClick={handleAdd}
          className="h-60 w-64 font-bold hover:text-white bg-sky-500 p-4 hover:bg-sky-400 transition-all duration-200 ease-in-out rounded-xl hover:after:"
        >
          Transferencias CVU o deposito bancario CBU
        </button>
      </div>
    </div>
  );
};
