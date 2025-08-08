import { useContext } from "react";

import ItemCount from "../ItemCount";
import { CartContext } from "../context/CartContext";
import { Card, CardBody, CardFooter } from "@heroui/react";
import LoadingComponent from "../LoadingComponent";

const timer = (
  <svg
    className="text-sky-500"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2v.07a7 7 0 0 1 2.812 1.058l.908-.908a.75.75 0 1 1 1.06 1.06l-.8.8A7 7 0 1 1 7 2.07V2a1 1 0 0 1-1-1m7.5 8a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0M8.75 5.75a.75.75 0 0 0-1.5 0v3.56l.22.22l2.254 2.254a.75.75 0 1 0 1.06-1.06L8.75 8.689z"
      clipRule="evenodd"
    />
  </svg>
);

export const ItemDetail = ({ producto }) => {
  // Obtener el estado del carrito y la función para agregar productos del contexto
  const { handleAddWidget, handleAdd, handleRemove, cantidad, convertArs } =
    useContext(CartContext);

  // Estado local para la cantidad de productos a agregar al carrito

  return !producto || Object.keys(producto).length === 0 ? (
    <LoadingComponent />
  ) : (
    <Card
      key={producto.id}
      className="relative w-64 flex items-center flex-col justify-center bg-[#18181B] rounded-lg  gap-3"
    >
      <img
        className=" h-[200px] w-full object-cover object-center rounded-t-lg rounded-b-lg"
        src={`${producto.image}`}
        alt={`${producto.title}`}
      />

      <CardBody className="flex flex-col justify-around overflow-visible  items-center  w-full gap-3 ">
        <div className="flex  justify-around items-center w-full">
          <h3 className="font-semibold text-white  ">{producto.title}</h3>
          <h3 className="font-semibold text-gray-500">
            {" "}
            {convertArs(producto.price)} ARS
          </h3>
        </div>
        {producto.stock === 0 ? (
          ""
        ) : (
          <div className="flex justify-around w-full items-center">
            <h3 className="font-semibold text-white">Stock</h3>
            <h3 className="font-semibold text-gray-500">{producto.stock}</h3>
          </div>
        )}
      </CardBody>
      {producto.stock === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center gap-2">
            {timer}
            <h2 className="text-sky-500  font-poppins">
              Agotado temporalmente
            </h2>
          </div>
          <h2 className="text-white font-poppins text-sm mb-2">
            Disponible pronto
          </h2>
        </div>
      ) : (
        <CardFooter>
          <ItemCount
            handleAdd={() => {
              handleAdd(cantidad, producto);
            }}
            handleRemove={() => {
              handleRemove(cantidad, producto);
            }}
            handleAddProduct={() => {
              handleAddWidget(producto, cantidad);
            }}
            cantidad={cantidad}
          />
        </CardFooter>
      )}
    </Card>
  );
};
