const ItemCount = ({ handleAdd, handleAddProduct, handleRemove, cantidad }) => {
  return (
    <div className="flex flex-row justify-around items-center p-2 bg-slate-950 w-full">
      <button
        onClick={handleAddProduct}
        className="text-cyan-500 font-semibold border border-sky-500 p-1 text-sm hover:text-white transition duration-0.5 hover:bg-slate-900  rounded-lg"
      >
        Agregar al carrito
      </button>
      <button
        onClick={handleAdd}
        className="text-cyan-500 font-semibold border border-sky-500 rounded-lg px-1 hover:text-white transition duration-0.5 hover:bg-slate-900"
      >
        +
      </button>
      <span className="text-white font-semibold">{cantidad}</span>
      <button
        onClick={handleRemove}
        className="text-cyan-500 font-semibold border border-sky-500 rounded-lg px-1 hover:text-white transition duration-0.5 hover:bg-slate-900"
      >
        -
      </button>
    </div>
  );
};

export default ItemCount;
