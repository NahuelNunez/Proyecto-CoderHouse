import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartWidget = () => {
  const { quantityInWidget } = useContext(CartContext);
  return (
    <div className="text-white font-semibolder hover:cursor-pointer flex gap-1">
      <FontAwesomeIcon
        icon={faCartShopping}
        size="xl"
        style={{ color: "#FFFF" }}
        className="px-2 m-1"
      />
      <p className="font-semibold  relative right-2 top-0 rounded-[25px] bg-red-700 border border-red-700 px-2 m-1">
        {quantityInWidget()}
      </p>

      <div className="px-2">
        <button className="text-cyan-500 font-semibold border border-sky-500 p-2 text-sm hover:text-white transition duration-0.5 hover:bg-slate-900  rounded-lg">
          Detalles de compra
        </button>
      </div>
    </div>
  );
};

export default CartWidget;
