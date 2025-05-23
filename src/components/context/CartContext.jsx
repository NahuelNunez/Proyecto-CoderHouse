import { createContext, useEffect, useState } from "react";
import { useDisclosure } from "@heroui/react";
import { useProductos } from "../Form as Admin/Store/useProductos";
// Crear el contexto para el carrito
export const CartContext = createContext();

const initialValue = JSON.parse(localStorage.getItem("carrito")) || [];

// Proveedor de contexto para gestionar el estado del carrito
export const CartProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setEditingProduct, clearEditingProduct, editProductos } =
    useProductos();

  const handleOpenModal = (producto = null) => {
    if (producto) {
      setEditingProduct(producto);
    } else {
      clearEditingProduct();
    }
    onOpen();
  };
  const handleCloseModal = () => {
    clearEditingProduct();

    onClose();
  };
  // Estado que almacena los productos en el carrito
  const [carrito, setCarrito] = useState(initialValue);

  // Función para agregar un producto al carrito o actualizar su cantidad
  const handleAddWidget = (item, cantidad) => {
    // Crear una copia del producto con la cantidad proporcionada
    const itemAgregado = { ...item, cantidad };

    // Crear una copia del carrito actual
    const nuevoCarrito = [...carrito];

    // Verificar si el producto ya está en el carrito
    const enElCarrito = nuevoCarrito.find(
      (producto) => producto.id === itemAgregado.id
    );

    // Si el producto ya está en el carrito, actualizar la cantidad
    if (enElCarrito) {
      enElCarrito.cantidad += cantidad;
      setCarrito(nuevoCarrito);
    } else {
      // Si el producto no está en el carrito, agregarlo
      nuevoCarrito.push(itemAgregado);
      setCarrito(nuevoCarrito);
    }
  };

  // Función para calcular la cantidad total de productos en el carrito
  const quantityInWidget = () => {
    return carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  };
  const totalWidget = () => {
    return carrito.reduce(
      (acc, producto) => acc + producto.cantidad * producto.precio,
      0
    );
  };
  const removeProduct = (productID) => {
    setCarrito(carrito.filter((producto) => producto.id !== productID));
  };

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);
  // Proporcionar el estado del carrito y las funciones asociadas a través del contexto
  return (
    <CartContext.Provider
      value={{
        carrito,
        handleAddWidget,
        quantityInWidget,
        totalWidget,
        removeProduct,
        isOpen,
        onOpen: handleOpenModal,
        onClose: handleCloseModal,
        editProductos,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
