import { useState, useEffect } from "react";
import { getProductos } from "../../services";
import ItemList from "../ItemList";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos().then((res) => {
      setProductos(res);
      console.log(res);
    });
  }, []);

  return (
    <div className="grid grid-cols-5 gap-6 mt-6 dark:bg-gray-900  w-[100%] h-screen place-items-center">
      {productos.map((producto) => (
        <ItemList key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default ItemListContainer;
