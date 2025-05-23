import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../components/ItemListContainer/ItemList";

export const Category = () => {
  const [titulo, setTitulo] = useState();
  const params = useParams();
  useEffect(() => {
    document.title = "Categoria | Chelitas Joyas";
  }, []);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-6  w-[100%]  h-screen place-items-center">
        {titulo?.map((item) => (
          <div key={item.id}>
            <ItemList producto={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
