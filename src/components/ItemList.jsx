import { Link } from "react-router-dom";
const ItemList = ({ producto }) => {
  return (
    <Link to={`/item/${producto.id}`}>
      <div className="w-64 border-2 border-sky-600 flex items-center flex-col justify-center bg-slate-950 rounded-[6px] gap-5 hover:scale-[1.1] transition duration-[0.5s]  ease-in-out">
      <div className="mt-2">
      <img  className="rounded-full"
          src={producto.imagen}
          style={{ width: "175px", height: "200px" }}
        />
      </div>
        
        <div className="flex flex-col items-center bg-slate-950 w-full rounded-b-[6px] gap-3">
          <h3 className="font-semibold text-white border-b-2 border-sky-600">{producto.titulo}</h3>
          <h3 className="font-semibold text-white">
          💲{producto.precio} ARS
          </h3>
          <h3 className="font-semibold text-white">
            Stock: {producto.stock}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ItemList;
