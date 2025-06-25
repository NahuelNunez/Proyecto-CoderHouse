import { useEffect } from "react";
import { ItemListContainer } from "../components/ItemListContainer/ItemListContainer";

export const Productos = () => {
  useEffect(() => {
    document.title = "Productos | Chelitas Joyas";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="uppercase font-playfair text-white text-[30px] mt-24 p-4 text-center sm:mt-[50px] ">
        Explora nuestras últimas joyas.
      </h1>
      <ItemListContainer />
    </div>
  );
};
