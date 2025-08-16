import { Card, CardBody, CardFooter } from "@heroui/react";
import { Link } from "react-router-dom";

import { useAuth } from "../Admin/Store/useAuth";
import { useProductos } from "../Form as Admin/Store/useProductos";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { Editlist } from "./Editlist";
import { CartContext } from "../context/CartContext";

const openEye = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.2em"
    height="1.2em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
    />
  </svg>
);

const closeEye = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.2em"
    height="1.2em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"
    />
  </svg>
);

export const ItemList = ({ producto }) => {
  const {
    deleteProductos,
    getProductos,
    inhabilitarProductos,
    habilitarProductos,
  } = useProductos();

  const { user } = useAuth();

  console.log("productos", producto);

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

  const enableDisableProduct = async (id, inhabilitado) => {
    if (inhabilitado === false) {
      try {
        await toast.promise(inhabilitarProductos(id, user.token), {
          pending: "Inhabilitando...",
          success: "Producto Inhabilitado",
          error: "Error al inhabilitar el producto",
        });
        getProductos();
      } catch (error) {
        console.error("Error al inhabilitar el producto,contactar a soporte");
      }
    } else {
      try {
        await toast.promise(habilitarProductos(id, user.token), {
          pending: "Habilitando...",
          success: "Producto Habilitado",
          error: "Error al habilitar el producto",
        });
        getProductos();
      } catch (error) {
        console.error("Error al habilitar el producto,contactar a soporte");
      }
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
            {producto.inhabilitado === true && (
              <h3 className="uppercase absolute bg-red-600/80 text-[20px] p-2 tracking-widest  top-[0px]  font-poppins text-white ">
                inhabilitado
              </h3>
            )}
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

            <div className="flex flex-col items-center gap-2">
              <button
                className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out"
                onClick={() =>
                  enableDisableProduct(producto.id, producto.inhabilitado)
                }
              >
                {producto.inhabilitado === false ? openEye : closeEye}
              </button>
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
        ""
      )}

      {user?.rol === "operador" && (
        <Card
          key={producto.id}
          shadow="md"
          className="w-64  flex flex-col items-center bg-[#18181B] rounded-lg gap-4 hover:scale-105 transition duration-500 ease-in-out"
        >
          <CardBody className="flex justify-center overflow-visible p-0 ">
            {producto.inhabilitado === true && (
              <h3 className="uppercase absolute bg-red-600/80 text-[20px] p-2 tracking-widest  top-[0px]  font-poppins text-white ">
                inhabilitado
              </h3>
            )}
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

            <div className="flex flex-col items-center gap-2">
              <button
                className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out"
                onClick={() =>
                  enableDisableProduct(producto.id, producto.inhabilitado)
                }
              >
                {producto.inhabilitado === false ? openEye : closeEye}
              </button>
            </div>
          </CardFooter>
        </Card>
      )}

      {(producto.inhabilitado === false && user?.rol === "usuario") ||
      (producto.inhabilitado === false && user === null) ||
      (user?.rol === "superadmin" && producto.inhabilitado === false) ? (
        <Link to={`/item/${producto.id}`}>
          <Card
            key={producto.id}
            isPressable
            shadow="md"
            onPress={() => console.log("item pressed")}
            className={`w-64  flex flex-col items-center bg-[#18181B] rounded-lg gap-4 hover:scale-105 relative   transition duration-500 ease-in-out`}
          >
            {producto.stock === 0 ? (
              <h3 className="font-semibold     absolute top-2 left-2 tracking-widest font-poppins text-[10px] text-white bg-red-600 z-[1]  border border-red-600 p-1">
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
                {convertArs(producto.price)} ARS
              </h3>
            </CardFooter>
          </Card>
        </Link>
      ) : (
        ""
      )}
    </>
  );
};
