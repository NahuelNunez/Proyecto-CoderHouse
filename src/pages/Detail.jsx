import { useContext } from "react";
import { CartContext } from "../components/context/CartContext";

const Detail = () => {
  const { carrito, totalWidget, removeProduct } = useContext(CartContext);

  return (
    <div className="w-full h-screen gap-1 flex flex-col items-center justify-center">
      <div className="  bg-slate-850  flex flex-col max-w-[800px] w-full  gap-2 min-h-[200px]   overflow-auto scrollbar scrollbar-thumb-sky-500 scrollbar-track-slate-800 scrollbar-thinshadow-2xl">
        {carrito.length > 0 ? (
          <div className="flex justify-between items-center w-full gap-3.5 ">
            <div className="font-bold text-white">
              <h2>Item</h2>
            </div>
            <div className="font-bold text-white ml-7 ">
              <h2>Qty</h2>{" "}
            </div>

            <div className="flex gap-3 text-white font-bold text-center ">
              <h2>Price.Unit</h2> <h2>Price.Total</h2> <h2>Remove</h2>
            </div>
          </div>
        ) : (
          ""
        )}

        {carrito.length > 0 ? (
          carrito.map((prod) => (
            <div
              className="flex border-sky-500  bg-slate-950 border-[2px]  justify-between items-center    w-full "
              key={prod.id}
            >
              <div className="flex flex-col  gap-5 items-center justify-center ">
                <img
                  className="w-[50px] h-[50px] rounded-full"
                  src={prod.imagen}
                  alt=""
                />
                <h1 className="text-white font-semibold text-center">
                  {prod.titulo}
                </h1>
              </div>
              <div className="font-bold text-white text-center">
                <h2>{prod.cantidad}</h2>{" "}
              </div>

              <div className="flex gap-6 text-white font-bold items-center justify-center text-center p-2 mr-5 ">
                <h2>💲{prod.precio}</h2>
                <h2>💲{prod.precio * prod.cantidad}</h2>

                <button
                  onClick={() => removeProduct(prod.id)}
                  className="hover:text-red-600 duration-[0.5s] ease-in-out"
                >
                  <svg
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
                  </svg>
                </button>
              </div>
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
