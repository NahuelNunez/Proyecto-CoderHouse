import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useOrder } from "../../pages/Checkout/Store/useOrder";

import { UserLocalStorage } from "../Admin/UserLocalStorage";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
// Crear el contexto para el carrito
export const CartContext = createContext();

const initialValue = JSON.parse(localStorage.getItem("carrito")) || [];

// Proveedor de contexto para gestionar el estado del carrito
export const CartProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState("");
  const [postData, setPostData] = useState(null);

  UserLocalStorage();

  useEffect(() => {
    const getSession = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/session`, {
          withCredentials: true,
        });

        setSessionId(response.data.sessionId);
      } catch (error) {
        console.log("Error al obtener la sesion", error);
      }
    };
    getSession();
  }, []);
  const [menuForm, setMenuForm] = useState(false);
  const handleOpen = () => {
    setMenuForm(!menuForm);
  };
  const [confirmar, setConfirmar] = useState("");
  const [carrito, setCarrito] = useState(initialValue);
  const productosParaEnviar = carrito.map((product) => ({
    idProducto: product.id,
    titulo: product.title,
    precio: product.price,
    cantidad: product.cantidad,
    imagen: product.image,
  }));
  const { orderPost } = useOrder();
  const [formdata, setFormdata] = useState({
    metodoPago: "",
    tipoEntrega: "",
    nombreCompleto: "",
    domicilio: "",
    localidad: "",
    codigoPostal: "",
    email: "",
    telefono: 0,
    comprobanteURL: null,
    numeroTransferencia: "",
    estado: "",
    montoTotal: 0,
    productos: productosParaEnviar,
    sessionId: sessionId,
  });

  const [error, setError] = useState({});

  const handleOnChange = ({ target }) => {
    const { name, value, files } = target;
    if (name === "comprobanteURL") {
      setFormdata((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormdata((prev) => ({
        ...prev,
        [name]: value,
      }));

      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formdata.nombreCompleto)
      newErrors.nombreCompleto = "El nombre y apellido es obligatorio";
    if (!formdata.email) newErrors.email = "El email es obligatorio";

    if (!formdata.telefono)
      newErrors.telefono = "El numero de telefono es obligatorio";
    if (!formdata.numeroTransferencia)
      newErrors.numeroTransferencia = "El numero de transaccion es obligatorio";

    if (!formdata.montoTotal)
      newErrors.montoTotal = "El monto total es obligatorio";

    const montoCalculado = carrito.reduce(
      (acc, producto) => acc + producto.cantidad * producto.price,
      0
    );

    const montoIngresado = Number(formdata.montoTotal);

    if (montoIngresado !== montoCalculado) {
      newErrors.montoTotal = `El monto ingresado no coincide con el total a pagar (${convertArs(
        montoCalculado
      )})`;
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!validate()) return;

      const formData = new FormData();
      formData.append("metodoPago", formdata.metodoPago),
        formData.append("tipoEntrega", formdata.tipoEntrega),
        formData.append("nombreCompleto", formdata.nombreCompleto),
        formData.append("domicilio", formdata.domicilio),
        formData.append("localidad", formdata.localidad),
        formData.append("codigoPostal", formdata.codigoPostal),
        formData.append("email", formdata.email),
        formData.append("telefono", formdata.telefono),
        formData.append("numeroTransferencia", formdata.numeroTransferencia);
      formData.append("montoTotal", formdata.montoTotal);
      formData.append("sessionId", sessionId);

      if (formdata.comprobanteURL) {
        formData.append("comprobanteURL", formdata.comprobanteURL);
      }
      formData.append("productos", JSON.stringify(productosParaEnviar));
      const response = await toast.promise(orderPost(formData), {
        pending: "Subiendo...",
        success: "Pedido realizado exitosamente😎",
        error: "Error al realizar el pedido😣",
      });
      if (response.data) {
        setPostData(response.data);
        setConfirmar("Subido");
        setCarrito([]);
      }
    } catch (error) {
      console.log("Error al generar la orden", error);
    }
    handleOpen();
  };

  // Estado que almacena los productos en el carrito

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
      toast.success("Producto agregado exitosamente al carrito 🛒");
    } else {
      // Si el producto no está en el carrito, agregarlo
      nuevoCarrito.push(itemAgregado);
      setCarrito(nuevoCarrito);
      toast.success("Producto agregado exitosamente al carrito 🛒");
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
    const totalCarrito = carrito.reduce(
      (acc, producto) => acc + producto.cantidad * producto.price,
      0
    );

    const total = totalCarrito.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    });
    return total;
  };

  const convertArs = (rawPrice) => {
    const formattedPrice = Math.floor(rawPrice);
    return formattedPrice.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    });
  };
  const removeProduct = (productID) => {
    setCarrito(carrito.filter((producto) => producto.id !== productID));
    toast.success("Producto eliminado exitosamente del carrito 🛒");
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
        setFormdata,
        formdata,
        handleOnChange,
        convertArs,
        handleSubmit,
        confirmar,
        handleOpen,
        menuForm,
        sessionId,
        postData,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
