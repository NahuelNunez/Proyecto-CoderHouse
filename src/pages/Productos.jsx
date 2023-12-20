import ItemListContainer from "../components/ItemListContainer/ItemListContainer";

export const Productos = () => {
  return (
    <div className="w-full h-full">
      <h1 className="font-semibold text-white text-lg text-center">
        Productos
      </h1>
      <ItemListContainer />
    </div>
  );
};
