import { useContext, useState } from "react";

import ItemCount from "../ItemCount";
import { CartContext } from "../context/CartContext";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import LoadingComponent from "../LoadingComponent";

const baseURL = import.meta.env.VITE_API_URL;

export const ItemDetail = ({ producto }) => {
  // Obtener el estado del carrito y la función para agregar productos del contexto
  const { handleAddWidget, handleAdd, handleRemove, cantidad } =
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
        src={`${baseURL}/uploads/${producto.image}`}
      />

      <CardBody className="flex flex-row justify-around overflow-visible  items-center  w-full gap-3 ">
        <h3 className="font-semibold text-white  ">{producto.title}</h3>
        <h3 className="font-semibold text-gray-500"> {producto.price} ARS</h3>
      </CardBody>
      <CardFooter>
        <ItemCount
          handleAdd={() => {
            handleAdd(cantidad);
          }}
          handleRemove={() => {
            handleRemove(cantidad);
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
