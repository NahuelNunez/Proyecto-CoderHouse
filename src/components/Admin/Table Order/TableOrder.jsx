import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useOrder } from "../../../hooks/useOrder";
const closeButton = (
  <svg
    className="hover:text-red-500 ease-in-out transition-all duration-300"
    xmlns="http://www.w3.org/2000/svg"
    width="2em"
    height="2em"
    viewBox="0 0 100 100"
  >
    <path
      fill="currentColor"
      d="M84.707 68.752L65.951 49.998l18.75-18.752a1.99 1.99 0 0 0 0-2.813L71.566 15.295a1.99 1.99 0 0 0-2.814 0L49.999 34.047l-18.75-18.752c-.746-.747-2.067-.747-2.814 0L15.297 28.431a1.99 1.99 0 0 0 0 2.814L34.05 49.998L15.294 68.753a1.993 1.993 0 0 0 0 2.814L28.43 84.704a1.99 1.99 0 0 0 2.814 0l18.755-18.755l18.756 18.754c.389.388.896.583 1.407.583s1.019-.195 1.408-.583l13.138-13.137a1.99 1.99 0 0 0-.001-2.814"
    />
  </svg>
);
const baseURL = import.meta.env.VITE_API_URL;
export const TableOrder = () => {
  const [imagenOpen, setImagenOpen] = useState(false);
  const [image, setImage] = useState();
  const { convertArs } = useContext(CartContext);
  const { getOrder } = useOrder();
  const [allOrder, setAllOrder] = useState([]);
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await getOrder();
        if (response) {
          setAllOrder(response.data);
        }
      } catch (error) {
        console.log("Error al obtener las ordenes", error);
      }
    };
    getAllOrders();
  }, []);
  const handleOpenImage = (orders) => {
    setImagenOpen(!imagenOpen);
    setImage(orders);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      <h2 className="font-playfair text-[40px] text-white mb-10">Ordenes</h2>
      <div className="w-[90%] h-[90%]">
        <Table className="bg-black/90 p-4" aria-label="string">
          <TableHeader>
            <TableColumn>FULL NAME</TableColumn>
            <TableColumn>METODO PAGO</TableColumn>
            <TableColumn>TIPO ENTREGA</TableColumn>
            <TableColumn>ESTADO</TableColumn>
            <TableColumn>NUMERO TELEFONO</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>LOCALIDAD</TableColumn>
            <TableColumn>DOMICILIO</TableColumn>
            <TableColumn>CODIGO POSTAL</TableColumn>
            <TableColumn>N° Transferencia</TableColumn>
            <TableColumn>MONTO TOTAL</TableColumn>
            <TableColumn>COMPROBANTE URL</TableColumn>
          </TableHeader>
          <TableBody>
            {allOrder.map((orders) => (
              <TableRow key={orders.id}>
                <TableCell>{orders.nombreCompleto}</TableCell>
                <TableCell>{orders.metodoPago}</TableCell>
                <TableCell>{orders.tipoEntrega}</TableCell>
                <TableCell>{orders.estado}</TableCell>
                <TableCell>{orders.telefono}</TableCell>
                <TableCell>{orders.email}</TableCell>
                <TableCell>{orders.localidad}</TableCell>
                <TableCell>{orders.domicilio}</TableCell>
                <TableCell>{orders.codigoPostal}</TableCell>
                <TableCell>{orders.numeroTransferencia}</TableCell>
                <TableCell>{convertArs(orders.montoTotal)}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenImage(orders.comprobanteURL)}
                    className="text-blue-500 hover:text-blue-700 ease-in-out transition-all duration-300"
                  >
                    Abrir imagen
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {imagenOpen && (
        <div className="absolute flex  flex-col-reverse gap-5 justify-center items-center bg-black/90 w-[590px] h-[580px] ">
          <embed
            className="w-[500px] h-[500px]  object-cover"
            src={`${baseURL}/uploads/${image}`}
          />
          <button
            onClick={() => setImagenOpen(false)}
            className=" text-white relative left-[270px] "
          >
            {closeButton}
          </button>
        </div>
      )}
    </div>
  );
};
