import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartWidget = () => {
  const { quantityInWidget } = useContext(CartContext);
  return (
    <div className="text-white font-semibolder hover:cursor-pointer">
      <div className="flex lg:flex-col-reverse">
        <Link to={"/detail"} className="">
          <FontAwesomeIcon
            icon={faCartShopping}
            size="xl"
            style={{ color: "#FFFF" }}
            className="sm:mt-5 lg:mt-0 "
          />
        </Link>
        <span className=" sm:absolute sm:left-[49%] border-2 h-6 w-6  font-semibold text-sm  text-center   bg-red-700 border-red-700 rounded-full lg:relative  lg:ml-[2px]">
          {quantityInWidget()}
        </span>
      </div>
    </div>
  );
};

export default CartWidget;
