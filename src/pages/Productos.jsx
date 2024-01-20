import { useEffect } from "react";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";

export const Productos = () => {
  useEffect(() => {
    document.title = "Productos | Chelitas Joyas";
  }, []);

  return (
    <div className="w-full h-full">
      <h1 className="font-semibold text-white text-[30px] text-center m-4">
        Productos
      </h1>
      <ItemListContainer />
    </div>
  );
};
