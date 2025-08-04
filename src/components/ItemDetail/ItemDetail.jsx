import { useContext } from "react";

import ItemCount from "../ItemCount";
import { CartContext } from "../context/CartContext";
import { Card, CardBody, CardFooter } from "@heroui/react";
import LoadingComponent from "../LoadingComponent";

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
        <div className="flex justify-around w-full items-center">
          <h3 className="font-semibold text-white">Stock</h3>
          <h3 className="font-semibold text-gray-500">{producto.stock}</h3>
        </div>
      </CardBody>
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
    </Card>
  );
};
