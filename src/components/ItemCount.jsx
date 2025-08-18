const ItemCount = ({
  handleAdd,
  handleAddProduct,
  handleRemove,
  cantidad,
  producto,
}) => {
  return (
    <div className="relative flex flex-row justify-between w-full items-center  gap-2   ">
      <button
        onClick={handleAddProduct}
        className="text-cyan-500 font-semibold border border-sky-500 p-1 text-sm hover:text-white transition duration-0.5 hover:bg-slate-900  rounded-lg"
      >
        Agregar al carrito
      </button>
      <button
        onClick={handleRemove}
        className="text-cyan-500 font-semibold border border-sky-500 rounded-full px-2 hover:text-white transition duration-0.5 hover:bg-slate-900"
      >
        -
      </button>

      <span className="text-white font-semibold absolute right-9">
        {cantidad}
      </span>
      <button
        onClick={handleAdd}
        className="text-cyan-500 font-semibold border  border-sky-500 rounded-full p-0 px-[6px]  hover:text-white transition duration-0.5 hover:bg-slate-900"
      >
        +
      </button>
    </div>
  );
};

export default ItemCount;
