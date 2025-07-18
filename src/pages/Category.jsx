import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../components/ItemListContainer/ItemList";
import { useProductos } from "../components/Form as Admin/Store/useProductos";

export const Category = () => {
  const { category } = useParams();
  const { getProductos, productos } = useProductos();
  useEffect(() => {
    document.title = "Categoria | Chelitas Joyas";
    getProductos();
  }, []);

  const filterProducts = productos.filter(
    (product) => product.category === category
  );

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      {filterProducts.length <= 0 ? (
        <h2 className="text-white text-[40px] text-center">No hay Productos</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-6  w-[100%]  min-h-screen place-items-center">
          {filterProducts.map((item) => (
            <div key={item.id}>
              <ItemList producto={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
