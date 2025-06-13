import { useContext, useEffect, useState } from "react";

import { useOrder } from "../Store/useOrder";
import { CartContext } from "../../../components/context/CartContext";
import { useParams } from "react-router-dom";

export const Resumen = () => {
  const { sessionId } = useContext(CartContext);
  const [ordenes, setOrdenes] = useState([]);
  const { id } = useParams();
  const { getOrderBySessionId } = useOrder();

  useEffect(() => {
    const viewOrder = async () => {
      try {
        const response = await getOrderBySessionId(id, sessionId);
        setOrdenes(response.data);
      } catch (error) {
        console.log("Error al obtener las ordenes");
      }
    };
    viewOrder();
  }, []);

  {
    console.log("Data de ordenes:", ordenes);
  }

  return (
    <div className="min-h-screen flex flex-col font-poppins justify-center items-center ">
      <div className="bg-black/95 flex flex-col p-4 gap-4 ">
        <h1 className="text-center">RESUMEN</h1>
        <div className="text-center">
          <h2>Gracias Por tu compra!</h2>
          <h2>Recibimos tu pedido n° {ordenes.id}!</h2>
          <h2>La confirmacion fue enviada a tu correo.</h2>
        </div>
        {ordenes.tipoEntrega === "Retiro" ? (
          <div>
            <h2 className="text-sky-500">Metodo retiro:</h2>

            <div className="flex flex-col  gap-2 ">
              <h2>
                Una vez confirmada la acreditacion del pago , comenzaremos con
                el armado de tu pedido.
              </h2>
              <h2>
                Nos comunicaremos via WhatsApp para notificar cuando el pedido
                este listo.
              </h2>
              <h2>El pedido puede demorar hasta 48hs habiles.</h2>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-sky-500"> Metodo de entrega:</h2>

            <div className="flex flex-col gap-4 text-gray-400">
              <h2>
                Una vez confirmada la acreditacion del pago, comenzaremos con el
                armado de tu pedido.
              </h2>
              <h2>
                Nos comunicaremos via WhatsApp para coordinar la entrega del
                pedido al{" "}
                <span className="text-gray-300">
                  {ordenes.domicilio
                    ? `domicilio   : ${ordenes.domicilio}.`
                    : `domicilio.`}
                </span>
              </h2>
              <h2>El pedido puede demorar hasta 72 hs habiles ⏱</h2>
            </div>
          </div>
        )}
        <div className="text-center">
          <h2>🙏Gracias por tu paciencia</h2>
          <h2 className="text-sky-500">Chelitas joyas</h2>
        </div>
        <h2 className="text-center">
          Ante cualquier duda comunicate con nosotros por WhatsApp.
        </h2>
      </div>
    </div>
  );
};
