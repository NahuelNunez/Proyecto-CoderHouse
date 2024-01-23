import { useContext, useState } from "react";

import ItemCount from "./ItemCount";
import { CartContext } from "./context/CartContext";

export const ItemDetail = ({ item }) => {
  // Obtener el estado del carrito y la función para agregar productos del contexto
  const { carrito, handleAddWidget } = useContext(CartContext);
 console.log(carrito)
  // Estado local para la cantidad de productos a agregar al carrito
  const [cantidad, setCantidad] = useState(1);

  // Función para incrementar la cantidad
  const handleAdd = () => {
    // Verificar que la cantidad no supere el stock disponible
    if (cantidad < item.stock) setCantidad(cantidad + 1);
  };

  // Función para decrementar la cantidad
  const handleRemove = () => {
    // Verificar que la cantidad sea mayor que 1 antes de decrementar
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  return (
    <div className="w-64 border-2 border-sky-600 flex items-center flex-col justify-center bg-slate-700 rounded-lg ">
      <img src={item.imagen} style={{ width: "175px", height: "200px" }} />
      <div className="flex flex-col items-center bg-slate-950 w-full">
        <h3 className="font-semibold text-white">{item.titulo}</h3>
        <h3 className="font-semibold text-white">Precio: {item.precio}💲</h3>
        <h3 className="font-semibold text-white">Cantidad: {item.stock}</h3>
        <h3 className="font-semibold text-white">Categoria: {item.category}</h3>
      </div>

      <ItemCount
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleAddProduct={() => {
          handleAddWidget(item, cantidad);
        }}
        cantidad={cantidad}
      />
    </div>
  );
};
