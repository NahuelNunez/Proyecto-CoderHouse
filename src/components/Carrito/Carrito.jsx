import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export const Carrito = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("md");
  const { carrito, setCarrito, totalWidget, removeProduct, quantityInWidget } =
    useContext(CartContext);
  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };
  const handleRestById = (id) => {
    const enCarrito = [...carrito];

    const Rest = enCarrito.find((product) => product.id === id);

    if (Rest.cantidad > 1) {
      Rest.cantidad = Rest.cantidad - 1;
      setCarrito(enCarrito);
    }
  };

  const handleSumById = (id) => {
    const newCarrito = [...carrito];
    const Sum = newCarrito.find((product) => product.id === id);
    if (Sum) {
      Sum.cantidad = Sum.cantidad + 1;
      setCarrito(newCarrito);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 ">
        <Button
          key={size}
          className="bg-transparent p-0 w-0"
          onPress={() => handleOpen(size)}
        >
          <div className="relative group hover:scale-110 transition-all ease-in-out duration-[0.5s]">
            <svg
              className="text-white  transition-all ease-in-out duration-[0.5s]"
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6 22q-.825 0-1.412-.587T4 20V8q0-.825.588-1.412T6 6h2q0-1.65 1.175-2.825T12 2t2.825 1.175T16 6h2q.825 0 1.413.588T20 8v12q0 .825-.587 1.413T18 22zm4-16h4q0-.825-.587-1.412T12 4t-1.412.588T10 6m5 5q.425 0 .713-.288T16 10V8h-2v2q0 .425.288.713T15 11m-6 0q.425 0 .713-.288T10 10V8H8v2q0 .425.288.713T9 11"
              />
            </svg>
            <div className="absolute top-3 left-3">
              <span className="text-black font-semibold  group-hover:text-white bg-sky-500 px-[6px] rounded-full transition-all ease-in-out duration-[0.5s]">
                {quantityInWidget()}
              </span>
            </div>
          </div>
        </Button>
      </div>
      <Drawer isOpen={isOpen} size={size} onClose={onClose}>
        <DrawerContent className="absolute">
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 ">
                Tu Carrito
              </DrawerHeader>
              <DrawerBody>
                {carrito.length > 0 ? (
                  carrito.map((prod) => (
                    <div key={prod.id} className="flex gap-4">
                      <img
                        src={`${baseURL}/uploads/${prod.image}`}
                        alt=""
                        className="h-[100px] w-[120px] object-cover"
                      />
                      <div className="flex flex-col justify-start   w-full">
                        <div className="flex flex-col gap-3">
                          <h2 className="font-playfair">{prod.title}</h2>
                          <h2 className="font-poppins  text-sky-500">
                            ${prod.price}
                          </h2>
                        </div>
                        <div className="w-full flex items-centers justify-between p-4 ">
                          <div className="flex gap-7">
                            <button
                              onClick={() => handleRestById(prod.id)}
                              className="hover:bg-sky-500 px-[10px] hover:text-white transition-all duration-300 ease-in"
                            >
                              -
                            </button>{" "}
                            {prod.cantidad}{" "}
                            <button
                              onClick={() => handleSumById(prod.id)}
                              className="hover:bg-sky-500 px-[8px] hover:text-white transition-all duration-300 ease-in"
                            >
                              +
                            </button>
                          </div>
                          <div>
                            <button onClick={() => removeProduct(prod.id)}>
                              <svg
                                className="text-gray-500 hover:text-red-500 transition-all hover:scale-110 hover:duration-200 ease-in"
                                xmlns="http://www.w3.org/2000/svg"
                                width="0.88em"
                                height="1em"
                                viewBox="0 0 448 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7M416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <h2 className="text-gray-500">El carrito esta vacio</h2>
                  </div>
                )}
              </DrawerBody>
              <DrawerFooter className="w-full justify-center mb-20">
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex w-full justify-between">
                    <h2 className="font-playfair font-semibold text-gray-900 text-lg">
                      Total:
                    </h2>

                    <h2 className="font-poppins">${totalWidget()}</h2>
                  </div>
                  <button className="  w-full bg-black  text-sky-500 hover:scale-105 hover:bg-sky-500 hover:text-black scale-90 transition-all duration-[0.5s] ease-in-out   font-bold p-3 text-md">
                    <h2 className="">FINALIZAR COMPRA</h2>
                  </button>
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
