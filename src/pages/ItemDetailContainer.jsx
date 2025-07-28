import { ItemDetail } from "../components/ItemDetail/ItemDetail";
import { useProductos } from "../components/Form as Admin/Store/useProductos";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../components/context/CartContext";

export const ItemDetailContainer = () => {
  const [item, setItem] = useState({});
  const { getById } = useProductos();
  const { id } = useParams();

  useEffect(() => {
    const getId = async () => {
      try {
        const response = await getById(id);
        setItem(response.data);
      } catch (error) {
        console.error("Error al obtener los productos", error);
      }
    };

    getId();
  }, []);

  console.log("PAGINA VERCEL ID ITEM", id);

  return (
    <div className="flex items-center justify-center   h-screen">
      {item && <ItemDetail producto={item} />}
    </div>
  );
};
