import { useEffect, useState } from "react";
import { getCategory } from "../services/categoriesService";
import { useParams } from "react-router-dom";
import ItemList from "../components/ItemList";

export const Category = () => {
  const [titulo, setTitulo] = useState();
  const params = useParams();
  console.log(params);
  useEffect(() => {
    const categoriaData = getCategory(params.id);
    setTitulo(categoriaData);
  }, [params.id]);

  return (
    <div className="grid grid-cols-5 gap-6 mt-6 dark:bg-gray-900 w-[100%]  h-screen place-items-center">
      {titulo?.map((item) => (
        <div key={item.id}>
          <ItemList producto={item} />
        </div>
      ))}
    </div>
  );
};
