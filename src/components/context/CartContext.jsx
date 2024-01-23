import { createContext, useState } from "react";

// Crear el contexto para el carrito
export const CartContext = createContext();

// Proveedor de contexto para gestionar el estado del carrito
export const CartProvider = ({ children }) => {
  // Estado que almacena los productos en el carrito
  const [carrito, setCarrito] = useState([]);

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

  // Proporcionar el estado del carrito y las funciones asociadas a través del contexto
  return (
    <CartContext.Provider
      value={{
        carrito,
        handleAddWidget,
        quantityInWidget,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
