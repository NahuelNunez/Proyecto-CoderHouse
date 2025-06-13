import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../components/ItemListContainer/ItemList";
import { useProductos } from "../components/Form as Admin/Store/useProductos";

export const Category = () => {
  const [titulo, setTitulo] = useState([]);
  const { category } = useParams();
  const { getProductos } = useProductos();
  useEffect(() => {
    const getAllProductos = async () => {
      try {
        const response = await getProductos();
        if (response) {
          setTitulo(response.data);
        }
      } catch (error) {
        console.log("Error al obtener los productos", error);
      }
    };
    getAllProductos();

    document.title = "Categoria | Chelitas Joyas";
  }, []);

  const filterTitle = titulo.filter(
    (producto) => producto.category === category
  );

  console.log("Data filtrada", filterTitle);
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-6  w-[100%]  h-screen place-items-center">
        {filterTitle?.map((item) => (
          <div key={item.id}>
            <ItemList producto={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
