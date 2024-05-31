import { useEffect } from "react";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";

export const Productos = () => {
  useEffect(() => {
    document.title = "Productos | Chelitas Joyas";
  }, []);

  return (
    <div className="  bg-slate-900 ">
      <h1 className="font-semibold text-white text-[30px] p-4 text-center sm:mt-[50px] ">
        Productos
      </h1>
      <ItemListContainer />
    </div>
  );
};
