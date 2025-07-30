import { useState, useEffect } from "react";

import LoadingComponent from "../LoadingComponent";
import { useProductos } from "../Form as Admin/Store/useProductos";
import { ItemList } from "./ItemList";

export const ItemListContainer = () => {
  const { getProductos, productos } = useProductos();

  useEffect(() => {
    getProductos();
  }, []);

  return productos.length <= 0 ? (
    <LoadingComponent /> // Agrego un loading component para la demora de carga
  ) : (
    <div className="container mx-auto">
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   xl:grid-cols-5 gap-20   place-items-center mb-6 ">
        {productos.map((producto) => (
          <ItemList key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};
