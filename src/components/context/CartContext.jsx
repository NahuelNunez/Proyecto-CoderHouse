import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { UserLocalStorage } from "../../hooks/UserLocalStorage";
import axios from "axios";
import { useAuth } from "../Admin/Store/useAuth";
// import { useOrder } from "../../hooks/useOrder";

const baseURL = import.meta.env.VITE_API_URL;
// Crear el contexto para el carrito
export const CartContext = createContext();
const initialValue = JSON.parse(localStorage.getItem("carrito")) || [];

// Proveedor de contexto para gestionar el estado del carrito
export const CartProvider = ({ children }) => {
  UserLocalStorage();
  const { user } = useAuth();

  const [sessionId, setSessionId] = useState(null);
  // const [postData, setPostData] = useState(null);
  // const [confirmar, setConfirmar] = useState("");
  const [carrito, setCarrito] = useState(initialValue);
  const [menuForm, setMenuForm] = useState(false);

  const [cantidad, setCantidad] = useState(1);
  const handleOpen = () => {
    setMenuForm(!menuForm);
  };

  const productosParaEnviar = carrito.map((product) => ({
    idProducto: product.id,
    titulo: product.title,
    precio: product.price,
    cantidad: product.cantidad,
    imagen: product.image,
  }));

  useEffect(() => {
    const getSession = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/session`, {
          withCredentials: "include",
        });

        setSessionId(response.data.sessionId);
      } catch (error) {
        console.log("Error al obtener la sesion", error);
      }
    };
    getSession();
  }, []);

  useEffect(() => {
    setFormdata((prev) => ({
      ...prev,
      sessionId: sessionId,
    }));
  }, [sessionId]);

  useEffect(() => {
    setFormdata((prev) => ({
      ...prev,
      userToken: user?.email || "",
    }));
  }, [user?.email]);

  useEffect(() => {
    setFormdata((prev) => ({
      ...prev,
      productos: productosParaEnviar,
    }));
  }, [carrito]);

  const [formdata, setFormdata] = useState({
    metodoPago: "",
    tipoEntrega: "",
    nombre: "",
    apellido: "",
    domicilio: "",
    localidad: "",
    codigoPostal: "",
    email: "",
    telefono: 0,
    comprobanteURL: null,
    numeroTransferencia: "",
    estado: "",
    montoTotal: 0,
    envio: 0,
    productos: [],
    sessionId: sessionId,

    userToken: user?.email || "",
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

    if (!formdata.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";

    if (!formdata.apellido.trim())
      newErrors.apellido = "El apellido es obligatorio";
    if (!formdata.email.trim()) newErrors.email = "El email es obligatorio";

    if (!formdata.telefono)
      newErrors.telefono = "El numero de telefono es obligatorio";
    if (!formdata.tipoEntrega)
      newErrors.tipoEntrega = "Seleccione un tipo de entrega";
    else if (formdata.tipoEntrega === "Envio") {
      if (!formdata.envio) newErrors.envio = "Seleccione Destino.";
      if (!formdata.domicilio.trim())
        newErrors.domicilio = "El domicilio es obligatorio.";
      if (!formdata.localidad.trim())
        newErrors.localidad = "La localidad es obligatoria.";
      if (!formdata.codigoPostal || isNaN(formdata.codigoPostal)) {
        newErrors.codigoPostal = "Código postal obligatorio.";
      }
      if (!formdata.envio) newErrors.envio = "Seleccioná un precio de envío.";
    }
    setError(newErrors);
    if (!formdata.metodoPago)
      newErrors.metodoPago = "Seleccione metodo de pago";
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   try {
  //     e.preventDefault();
  //     if (!validate()) return;

  //     const formData = new FormData();
  //     formData.append("metodoPago", formdata.metodoPago),
  //       formData.append("tipoEntrega", formdata.tipoEntrega),
  //       formData.append("nombre", formdata.nombre),
  //       formData.append("apellido", formdata.apellido),
  //       formData.append("domicilio", formdata.domicilio),
  //       formData.append("localidad", formdata.localidad),
  //       formData.append("codigoPostal", formdata.codigoPostal),
  //       formData.append("email", formdata.email),
  //       formData.append("telefono", formdata.telefono),
  //       formData.append("numeroTransferencia", formdata.numeroTransferencia);
  //     formData.append("montoTotal", formdata.montoTotal);
  //     formData.append("sessionId", sessionId);
  //     if (user?.email) {
  //       formData.append("userToken", user?.email);
  //     }

  //     // if (formdata.comprobanteURL) {
  //     //   formData.append("comprobanteURL", formdata.comprobanteURL);
  //     // }
  //     formData.append("productos", JSON.stringify(productosParaEnviar));
  //     const response = await toast.promise(orderPost(formData), {
  //       pending: "Subiendo...",
  //       success: "Pedido realizado exitosamente😎",
  //       error: "Error al realizar el pedido😣",
  //     });
  //     if (response.data) {
  //       setPostData(response.data);
  //       setConfirmar("Subido");
  //       setCarrito([]);
  //     }
  //   } catch (error) {
  //     toast.error("Error al generar el pedido😣");
  //     console.log("Error al generar la orden", error);
  //   }
  //   handleOpen();
  // };

  // Estado que almacena los productos en el carrito

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
      // enElCarrito.cantidad += cantidad;
      // setCarrito(nuevoCarrito);
      toast.error("El producto ya existe en el carrito 🛒");
    } else {
      // Si el producto no está en el carrito, agregarlo
      nuevoCarrito.push(itemAgregado);
      setCarrito(nuevoCarrito);
      toast.success("Producto agregado exitosamente al carrito 🛒");
    }
  };
  // Función para incrementar la cantidad
  const handleAdd = (cantidad, producto) => {
    if (producto.stock === 0) return;
    // Verificar que la cantidad no supere el stock disponible
    if (cantidad < producto.stock) setCantidad(cantidad + 1);
  };

  // Función para decrementar la cantidad
  const handleRemove = (cantidad, producto) => {
    if (producto.stock === 0) return;
    if (cantidad === 0) return;
    if (producto.stock >= cantidad && cantidad > 1) setCantidad(cantidad - 1);
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

    const addEnvio =
      formdata.tipoEntrega === "Retiro"
        ? (formdata.envio = 0)
        : Number(formdata.envio);
    const totalito = totalCarrito + addEnvio;

    const total = totalito.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    });
    return total;
  };

  const totalWidget2 = () => {
    const totalCarrito = carrito.reduce(
      (acc, producto) => acc + producto.cantidad * producto.price,
      0
    );
    const totalCarrito2 = totalCarrito * (10 / 100);

    const Total2 = totalCarrito - totalCarrito2;
    const addEnvio =
      formdata.envio === "Retiro"
        ? (formdata.envio = 0)
        : Number(formdata.envio);
    const totalito = Total2 + addEnvio;

    const total = totalito.toLocaleString("es-AR", {
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

        handleOpen,
        menuForm,
        sessionId,
        validate,
        error,
        totalWidget2,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
