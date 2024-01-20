import { Link } from "react-router-dom";
const ItemList = ({ producto }) => {
  return (
    <Link to={`/item/${producto.id}`}>
      <div className="w-64 border-2 border-sky-600 flex items-center flex-col justify-center bg-slate-700 rounded-[5px] ">
        <img
          src={producto.imagen}
          style={{ width: "175px", height: "200px" }}
        />
        <div className="flex flex-col items-center bg-slate-950 w-full">
          <h3 className="font-semibold text-white">{producto.titulo}</h3>
          <h3 className="font-semibold text-white">
            Precio: {producto.precio}💲
          </h3>
          <h3 className="font-semibold text-white">
            Cantidad: {producto.stock}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ItemList;
