import { useContext, useState } from "react";

import ItemCount from "../ItemCount";
import { CartContext } from "../context/CartContext";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import LoadingComponent from "../LoadingComponent";

export const ItemDetail = ({ item }) => {
  // Obtener el estado del carrito y la función para agregar productos del contexto
  const { carrito, handleAddWidget } = useContext(CartContext);
  console.log(carrito);
  // Estado local para la cantidad de productos a agregar al carrito
  const [cantidad, setCantidad] = useState(1);

  // Función para incrementar la cantidad
  const handleAdd = () => {
    // Verificar que la cantidad no supere el stock disponible
    if (cantidad < 10) setCantidad(cantidad + 1);
  };

  // Función para decrementar la cantidad
  const handleRemove = () => {
    // Verificar que la cantidad sea mayor que 1 antes de decrementar
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  return !item || Object.keys(item).length === 0 ? (
    <LoadingComponent />
  ) : (
    <Card className="relative w-64 flex items-center flex-col justify-center bg-[#18181B] rounded-lg  gap-3">
      <img
        className=" h-40 w-full object-cover object-center rounded-t-lg rounded-b-lg"
        src={item.imagen}
      />

      <CardBody className="flex flex-row justify-around overflow-visible  items-center  w-full gap-3 ">
        <h3 className="font-semibold text-white  ">{item.titulo}</h3>
        <h3 className="font-semibold text-gray-500"> {item.precio} ARS</h3>
      </CardBody>
      <CardFooter>
        <ItemCount
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          handleAddProduct={() => {
            handleAddWidget(item, cantidad);
          }}
          cantidad={cantidad}
        />
      </CardFooter>
    </Card>
  );
};
