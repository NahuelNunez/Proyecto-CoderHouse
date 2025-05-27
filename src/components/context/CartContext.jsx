import { createContext, useEffect, useState } from "react";

// Crear el contexto para el carrito
export const CartContext = createContext();

const initialValue = JSON.parse(localStorage.getItem("carrito")) || [];

// Proveedor de contexto para gestionar el estado del carrito
export const CartProvider = ({ children }) => {
  // Estado que almacena los productos en el carrito
  const [carrito, setCarrito] = useState(initialValue);
  console.log("Carrito data:", carrito);
  const [cantidad, setCantidad] = useState(1);
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
  // Función para incrementar la cantidad
  const handleAdd = (cantidad) => {
    // Verificar que la cantidad no supere el stock disponible
    if (cantidad < 10) setCantidad(cantidad + 1);
  };

  // Función para decrementar la cantidad
  const handleRemove = (cantidad) => {
    // Verificar que la cantidad sea mayor que 1 antes de decrementar
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  // Función para calcular la cantidad total de productos en el carrito
  const quantityInWidget = () => {
    return carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  };
  const totalWidget = () => {
    return carrito.reduce(
      (acc, producto) => acc + producto.cantidad * producto.price,
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
        handleAdd,
        handleRemove,
        cantidad,
        setCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
