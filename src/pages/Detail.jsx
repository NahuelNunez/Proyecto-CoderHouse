import { useContext } from "react";
import { CartContext } from "../components/context/CartContext";
const baseURL = import.meta.env.VITE_API_URL;

const Detail = () => {
  const {
    carrito,
    totalWidget,
    removeProduct,

    cantidad,
    setCarrito,
  } = useContext(CartContext);
  const handleRestbyId = (id) => {
    const newCarrito = [...carrito];
    const Rest = newCarrito.find((product) => product.id === id);
    if (Rest.cantidad > 1) {
      Rest.cantidad = Rest.cantidad - 1;
      setCarrito(newCarrito);
    }
  };

  const handleAddbyId = (id) => {
    const copyCarrito = [...carrito];
    const Sum = copyCarrito.find((product) => product.id === id);
    if (Sum) {
      Sum.cantidad += 1;
      setCarrito(copyCarrito);
    }
  };
  return (
    <div className="w-full h-screen gap-1 flex flex-col items-center justify-center">
      <div className="  bg-slate-850  flex flex-col max-w-[800px] w-full  gap-2 min-h-[200px]   overflow-auto scrollbar scrollbar-thumb-sky-500 scrollbar-track-slate-800 scrollbar-thinshadow-2xl">
        {carrito.length > 0 ? (
          carrito.map((prod) => (
            <div
              className="w-full  border-sky-500  bg-slate-950 border-[2px] rounded-lg    p-6   "
              key={prod.id}
            >
              <table className="table-auto w-full text-center">
                <thead>
                  <tr className="text-white">
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-white">
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <img
                          className="w-[50px] h-[50px] rounded-full"
                          src={`${baseURL}/uploads/${prod.image}`}
                        />{" "}
                        {prod.title}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleRestbyId(prod.id)}
                          className="border-sky-500 border rounded-lg px-[10px] hover:bg-slate-800 transition-all duration-200 "
                        >
                          -
                        </button>
                        {prod.cantidad}{" "}
                        <button
                          onClick={() => handleAddbyId(prod.id)}
                          className="border-sky-500 border rounded-lg px-2 hover:bg-slate-800 transition-all duration-200  "
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${prod.price}</td>
                    <td>${prod.price * prod.cantidad}</td>
                    <td>
                      <button onClick={() => removeProduct(prod.id)}>
                        {" "}
                        <svg
                          className="text-white hover:text-red-500 transition-all duration-300 cursor-poiter"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <g fill="none">
                            <path
                              fill="currentColor"
                              d="m20 9l-1.995 11.346A2 2 0 0 1 16.035 22h-8.07a2 2 0 0 1-1.97-1.654L4 9"
                            />
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="m20 9l-1.995 11.346A2 2 0 0 1 16.035 22h-8.07a2 2 0 0 1-1.97-1.654L4 9zm1-3h-5.625M3 6h5.625m0 0V4a2 2 0 0 1 2-2h2.75a2 2 0 0 1 2 2v2m-6.75 0h6.75"
                            />
                          </g>
                        </svg>{" "}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <h2 className="text-white text-[30px] font-semibold text-center mt-[150px]">
            El carrito esta vacio 🛒
          </h2>
        )}
      </div>

      {carrito.length > 0 ? (
        <div className=" flex justify-evenly max-w-[700px]  h-[10%] bg-slate-950 border-sky-500 border-[2px]">
          <div>
            <h2 className="text-white font-semibold text-[25px]">
              PRECIO TOTAL:
            </h2>
          </div>
          <div>
            <h2 className="text-white font-semibold text-[25px]">
              💲{totalWidget()}
            </h2>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Detail;
