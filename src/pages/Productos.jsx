import { useEffect } from "react";
import { ItemListContainer } from "../components/ItemListContainer/ItemListContainer";

export const Productos = () => {
  useEffect(() => {
    document.title = "Productos | Chelitas Joyas";
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <h1 className="font-semibold font-playfair text-white text-[30px] p-4 text-center sm:mt-[50px] ">
        Explora nuestras últimas joyas.
      </h1>
      <ItemListContainer />
    </div>
  );
};
