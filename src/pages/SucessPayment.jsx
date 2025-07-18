import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import { CartContext } from "../components/context/CartContext";

const SucessPayment = () => {
  const [dataOrder, setDataOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { orderPost } = useOrder();
  const { setCarrito } = useContext(CartContext);
  const location = useLocation();

  useEffect(() => {
    const createOrderOnBackend = async () => {
      try {
        const clientData = JSON.parse(
          localStorage.getItem("clientData") || "{}"
        );
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        const urlParams = new URLSearchParams(location.search);
        const externalReference = urlParams.get("external_reference");
        const paymentId = urlParams.get("payment_id");
        const status = urlParams.get("status");
        const paymentType = urlParams.get("payment_type");
        const collectionId = urlParams.get("collection_id");

        if (!externalReference) {
          setError("No se encontro la referencia de pago externa.");
          setLoading(false);
          return;
        }

        if (
          !clientData ||
          Object.keys(clientData).length === 0 ||
          !cartItems ||
          cartItems.length === 0
        ) {
          setError(
            "No se encontraron datos del cliente o del carrito en el almacenamiento local."
          );
          setLoading(false);
          return;
        }

        const ItemsMap = cartItems.map((item) => ({
          idProducto: item.id,
          titulo: item.title,
          cantidad: item.cantidad,
          precio: item.price,
          imagen: item.image || "",
        }));

        const totalCarrito = cartItems.reduce(
          (acc, producto) => acc + producto.cantidad * producto.price,
          0
        );

        const orderPayload = {
          metodoPago: clientData.metodoPago,
          userToken: clientData.userToken || null,
          sessionId: clientData.sessionId || null,
          tipoEntrega: clientData.tipoEntrega,
          nombre: clientData.nombre,
          apellido: clientData.apellido,
          domicilio: clientData.domicilio || null,
          localidad: clientData.localidad || null,
          codigoPostal: clientData.codigoPostal || null,
          email: clientData.email,
          telefono: clientData.telefono,
          montoTotal: totalCarrito,
          productos: JSON.stringify(ItemsMap),
          paymentExternalReference: externalReference,
        };

        const result = await orderPost(orderPayload);

        if (result.error) {
          console.error("Error from useOrder hook:", result.error);
          setError(
            "Error al procesar tu orden. Por favor, contacta a soporte."
          );
          setLoading(false);
          return;
        }

        const data = result.data;
        if (data.orderData) {
          setDataOrder(data.orderData);
        }

        if (data && data.orderData) {
          localStorage.removeItem("clientData");
          localStorage.removeItem("cartItems");
          localStorage.removeItem("carrito");
          setCarrito([]);
        } else {
          setError(
            data
              ? data.error || "Error desconocido al crear la orden."
              : "Respuesta inesperada del servidor"
          );
        }
      } catch (err) {
        console.error("Error al crear la orden en el backend:", err);
        setError("Error al procesar tu orden. Contacta a soporte.");
      } finally {
        setLoading(false);
      }
    };
    createOrderOnBackend();
  }, []);

  console.log("DATA", dataOrder);
  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[22px] ">
        <div className="bg-black/90 text-red-500 text-center p-4 animate-pulse ">
          {error}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="font-oswald text-3xl font-semibold mb-6">
          ¡Pago Exitoso!
        </h2>
        <p className="mb-4">
          Gracias por tu compra. Tu pago ha sido procesado con éxito.
        </p>
        {dataOrder && (
          <>
            <div className="mb-6">
              <h4 className="font-oswald text-[18px] font-semibold mb-2">
                Datos del Cliente
              </h4>
              <p>
                **Nombre Completo:**{" "}
                {`${dataOrder.nombre} ${dataOrder.apellido}`}
              </p>{" "}
              {/* Corregido */}
              <p>**Email:** {dataOrder.email}</p> {/* Corregido */}
              <p>**Teléfono:** {dataOrder.telefono}</p>
              <p>**Tipo de Entrega:** {dataOrder.tipoEntrega}</p>
              {dataOrder.tipoEntrega === "Envio" && (
                <>
                  <p>
                    **Domicilio:** {dataOrder.domicilio}, {dataOrder.localidad}{" "}
                    (CP: {dataOrder.codigoPostal})
                  </p>
                </>
              )}
            </div>

            <div className="mb-6">
              <h4 className="font-oswald text-[18px] font-semibold mb-2">
                Detalle de la Orden
              </h4>
              <p>**ID de la Orden:** {dataOrder.id}</p>
              <p>**Monto Total:** ${dataOrder.montoTotal}</p>
              {/* Aquí podrías iterar sobre los productos si 'dataOrder' los incluye */}
            </div>
          </>
        )}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SucessPayment;
