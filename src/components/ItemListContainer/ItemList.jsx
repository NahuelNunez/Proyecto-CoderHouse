import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Link } from "react-router-dom";

import { useAuth } from "../Admin/Store/useAuth";
import { useProductos } from "../Form as Admin/Store/useProductos";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { Editlist } from "./Editlist";
import { CartContext } from "../context/CartContext";

export const ItemList = ({ producto }) => {
  const { deleteProductos, getProductos } = useProductos();

  const { user } = useAuth();

  const { convertArs } = useContext(CartContext);

  const deletebyId = async (id) => {
    try {
      await toast.promise(deleteProductos(id, user.token), {
        pending: "Eliminando...🙄",
        sucess: "Producto eliminado exitosamente 😎",
        error: "Error al eliminar el producto 😯",
      });
      getProductos();
    } catch (error) {
      console.log("Error al eliminar el producto", error);
      toast.error("Error al eliminar el producto 😯");
    }
  };

  useEffect(() => {
    getProductos();
  }, []);
  return (
    <>
      {user?.rol === "admin" ? (
        <Card
          key={producto.id}
          shadow="md"
          className="w-64  flex flex-col items-center bg-[#18181B] rounded-lg gap-4 hover:scale-105 transition duration-500 ease-in-out"
        >
          <CardBody className="flex justify-center overflow-visible p-0 ">
            <img
              className=" object-cover h-[200px] rounded-t-lg rounded-b-lg "
              src={`${producto.image}`}
            />
          </CardBody>
          <CardFooter className="text-center justify-between px-4">
            <h3 className="font-semibold text-white uppercase text-[14px] ">
              {producto.title}
            </h3>
            <h3 className="font-semibold text-gray-500">
              {convertArs(producto.price)}
            </h3>

            <div className="flex flex-col items-center">
              <Editlist producto={producto} user={user} />

              <button
                onClick={() => deletebyId(producto.id)}
                className="hover:text-red-500 text-white transition-all duration-300 ease-in-out "
              >
                <svg
                  className=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4em"
                  height="1.4em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                  />
                </svg>
              </button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Link to={`/item/${producto.id}`}>
          <Card
            key={producto.id}
            isPressable
            shadow="md"
            onPress={() => console.log("item pressed")}
            className={`w-64  flex flex-col items-center bg-[#18181B] rounded-lg gap-4 hover:scale-105 relative   transition duration-500 ease-in-out`}
          >
            {producto.stock === 0 ? (
              <h3 className="font-semibold     absolute top-2 left-2 tracking-widest font-poppins text-[10px] text-white bg-red-600 z-10 border border-red-600 p-1">
                SIN STOCK
              </h3>
            ) : (
              ""
            )}

            <CardBody className={`flex justify-center overflow-visible p-0 `}>
              <img
                className={` object-cover object-center h-[200px] w-full rounded-t-lg rounded-b-lg`}
                src={`${producto.image}`}
                alt={`${producto.title}`}
              />
            </CardBody>
            <CardFooter
              className={`text-center justify-between px-4 ${
                producto.stock === 0 ? "opacity-60" : ""
              } `}
            >
              {producto.stock === 0 && (
                <div className=" bg-white/30 bg-opacity-80 inset-0  absolute    "></div>
              )}

              <h3 className="font-semibold text-white uppercase text-[14px] ">
                {producto.title}
              </h3>
              <h3 className="font-semibold text-gray-500">
                {convertArs(producto.price)}
              </h3>
            </CardFooter>
          </Card>
        </Link>
      )}
    </>
  );
};
