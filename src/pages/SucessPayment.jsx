import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import { CartContext } from "../components/context/CartContext";

import { CheckCircle2, Loader2, XCircle } from "lucide-react";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/react";

const SucessPayment = () => {
  const [dataOrder, setDataOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getOrderByExternalReference } = useOrder();
  const { setCarrito } = useContext(CartContext);
  const location = useLocation();

  useEffect(() => {
    const getOrderByReference = async () => {
      const urlParams = new URLSearchParams(location.search);
      const externalReference = urlParams.get("ref");
      try {
        const { data: response, error: orderError } =
          await getOrderByExternalReference(externalReference);
        if (orderError) {
          setError("Error al obtener la orden , porfavor contacta a soporte.");
          setLoading(false);
          return;
        }

        if (response) {
          setDataOrder(response);
          localStorage.removeItem("carrito");
          localStorage.removeItem("cartItems");
          localStorage.removeItem("clientData");
          setCarrito([]);
        }
      } catch (error) {
        console.log("Error al obtener la orden", error);
      } finally {
        setLoading(false);
      }
    };
    getOrderByReference();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Card className="w-full max-w-md text-center p-8 shadow-lg rounded-xl">
          <CardHeader className="space-y-4">
            <div className="flex flex-col gap-2">
              <Loader2 className="mx-auto h-20 w-20 animate-spin text-primary" />
              <h1 className="text-4xl font-extrabold text-center text-primary">
                Procesando tu pago...
              </h1>
              <h2 className="text-lg text-center  text-muted-foreground">
                Estamos confirmando tu orden. Por favor, espera.
              </h2>
            </div>
          </CardHeader>

          <CardBody>
            <p className="text-base text-center text-muted-foreground">
              Esto puede tardar unos segundos.
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[22px] ">
        <Card className="w-full max-w-md text-center p-8 shadow-lg rounded-xl border-4 border-destructive">
          <CardHeader className="space-y-4 flex">
            <div className="flex flex-col gap-2 ">
              <XCircle className="mx-auto h-20 w-20 text-destructive" />
              <h1 className="text-4xl font-extrabold text-destructive">
                Error en el Pago
              </h1>
              <h2 className="text-lg text-muted-foreground">
                Ha ocurrido un error al procesar tu orden.
              </h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-6">
            <Button>
              <Link href="/">Volver al Inicio</Link>
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <Card className="w-full max-w-3xl p-10 shadow-2xl rounded-xl border-4 flex flex-col   border-green-500">
        <div className="text-center space-y-6">
          <div className="flex flex-col gap-2">
            <CheckCircle2 className="mx-auto h-24 w-24 text-green-600" />
            <h1 className="text-5xl font-extrabold text-green-700 leading-tight">
              ¡Pago Exitoso!
            </h1>
            <p className="text-xl text-muted-foreground">
              Gracias por tu compra. Tu pago ha sido procesado con éxito y tu
              orden está en camino.
            </p>
          </div>
        </div>
        <CardBody className="space-y-8 mt-8">
          {dataOrder && (
            <>
              <div className="flex flex-col gap-3 ">
                <div className="text-center">
                  <h4 className="text-2xl font-bold mb-3 text-gray-800">
                    Datos del Cliente
                  </h4>
                  <p>
                    <span className="font-semibold">Nombre Completo:</span>{" "}
                    {`${dataOrder.nombre} ${dataOrder.apellido}`}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {dataOrder.email}
                  </p>
                  <p>
                    <span className="font-semibold">Teléfono:</span>{" "}
                    {dataOrder.telefono}
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold mb-3 text-gray-800">
                    Detalles de Entrega
                  </h4>
                  <p>
                    <span className="font-semibold">Tipo de Entrega:</span>{" "}
                    {dataOrder.tipoEntrega}
                  </p>
                  {dataOrder.tipoEntrega === "Envio" && (
                    <p>
                      <span className="font-semibold">Domicilio:</span>{" "}
                      {`${dataOrder.domicilio}, ${dataOrder.localidad} (CP: ${dataOrder.codigoPostal})`}
                    </p>
                  )}
                </div>
              </div>
              <div className="my-8" />
              <div className="text-center space-y-4">
                <h4 className="text-2xl font-bold text-gray-800">
                  Resumen de la Orden
                </h4>
                <p className="text-xl">
                  <span className="font-semibold">ID de la Orden:</span>{" "}
                  <span className="font-bold text-primary">{dataOrder.id}</span>
                </p>
                <p className="text-4xl font-extrabold text-green-700">
                  <span className="font-semibold">Monto Total:</span> $
                  {dataOrder.montoTotal}
                </p>
                {/* Aquí podrías iterar sobre los productos si 'dataOrder' los incluye */}
              </div>
            </>
          )}
          <div className="flex justify-center mt-10">
            <Button
              size="lg"
              className="px-8 py-3 text-lg bg-green-600 hover:bg-green-700 text-white shadow-lg"
            >
              <Link to="/">Volver al Inicio</Link>
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SucessPayment;
