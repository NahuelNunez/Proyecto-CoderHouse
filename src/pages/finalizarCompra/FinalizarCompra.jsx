import { useContext, useEffect } from "react";
import { CartContext } from "../../components/context/CartContext";
import { Radio, RadioGroup } from "@heroui/react";

import { usePayment } from "../../hooks/usePayment";
import { useAuth } from "../../components/Admin/Store/useAuth";
import { useNavigate } from "react-router-dom";

const arrowRight = (
  <svg
    className=""
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z"
    />
  </svg>
);

export const FinalizarCompra = () => {
  const {
    formdata,
    totalWidget,
    handleOnChange,
    handleSubmit,
    confirmar,
    handleOpen,
    menuForm,
    error,
    totalWidget2,
    carrito,
    setCarrito,
    validate,

    convertArs,
  } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (carrito.length === 0) {
      navigate("/Productos");
    }
  }, []);
  const { createPayments } = usePayment();
  const { user } = useAuth();

  const selectDepartamentos = [
    { key: 0, label: "" },
    { key: 1, label: "Rawson" },
    { key: 2, label: "Capital" },
    { key: 3, label: "Media Agua" },
    { key: 4, label: "Chimbas" },
    { key: 5, label: "Santa lucia" },
    { key: 6, label: "Rivadavia" },
    { key: 7, label: "Rawson" },

    { key: 8, label: "Albardon" },
  ];
  const handleMercadoPayment = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!carrito || carrito.length === 0) {
      alert("El carrito esta vacio agregar productos para continuar.");
      return;
    }
    const shippingCost = Number(formdata.envio);
    try {
      if (user?.rol === "usuario") {
        const userEmail = user?.email;
        const userId = user?.token;
        const items = carrito.map((item) => ({
          productId: item.id,
          title: item.title,
          quantity: item.cantidad,
          unit_price: item.price * 0.9,
          current_id: "ARS",
        }));
        const response = await createPayments({
          items,
          formdata,
          userEmail,
          userId,
          shippingCost,
        });

        if (response.error) {
          console.error(
            "Error al procesar el pago con MercadoPago (desde hook):",
            response.error
          );
          alert(
            "Hubo un error al intentar conectar con MercadoPago. Intenta de nuevo. 444"
          );
          return;
        }

        const backendResponse = response.data;

        if (
          backendResponse &&
          backendResponse.success &&
          backendResponse.data &&
          backendResponse.data.initPoint
        ) {
          // Redirigir a MercadoPago
          window.location.href = backendResponse.data.initPoint;
        }
      } else {
        const items = carrito.map((item) => ({
          productId: item.id,
          title: item.title,
          quantity: item.cantidad,
          unit_price: item.price,
          current_id: "ARS",
        }));
        const response = await createPayments({
          items,
          formdata,
        });

        if (response.error) {
          console.error(
            "Error al procesar el pago con MercadoPago (desde hook):",
            response.error
          );
          alert(
            "Hubo un error al intentar conectar con MercadoPago. Intenta de nuevo."
          );
          return;
        }

        const backendResponse = response.data;

        if (
          backendResponse &&
          backendResponse.success &&
          backendResponse.data &&
          backendResponse.data.initPoint
        ) {
          // Redirigir a MercadoPago
          window.location.href = backendResponse.data.initPoint;
        }
      }
    } catch (error) {
      console.error("Error al procesar el pago con MercadoPago:", error);
      alert(
        "Hubo un error al intentar conectar con MercadoPago. Intenta de nuevo."
      );
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="font-playfair text-[40px] text-center p-20 text-white">
        Finalizar Compra
      </h2>

      <form
        onSubmit={
          formdata.metodoPago === "tarjeta" ||
          formdata.metodoPago === "mercadoPago-basic"
            ? handleMercadoPayment
            : handleMercadoPayment
        }
        className="bg-black/90 p-8 flex flex-col justify-between relative gap-10 mb-10  min-w-[320px] w-[80%]"
      >
        <h4 className="text-white font-poppins text-[15px]">
          Detalles Facturacion
        </h4>

        <div className="flex flex-col md:flex-row md:justify-around md:gap-24 w-full">
          <div className=" w-full flex flex-col gap-2 relative">
            <span className="text-white text-[14px] font-oswald">Nombre</span>
            <input
              name="nombre"
              onChange={handleOnChange}
              className="bg-transparent text-sky-500 text-[12px] w-[100%] border-b-1 placeholder:text-[12px] placeholder:text-gray-600 border-b-gray-600 focus:border-b-white outline-none transition-all duration-300 ease-in-out"
              type="text"
            />
            {error.nombre && (
              <p className=" text-red-500 text-sm">{error.nombre}</p>
            )}
          </div>

          <div className=" w-full flex relative flex-col gap-2">
            <span className="text-white font-oswald text-[14px]">Apellido</span>
            <input
              name="apellido"
              onChange={handleOnChange}
              type="text"
              className=" w-[100%] text-sky-500 text-[12px] bg-transparent border-b-1 placeholder:text-[12px] placeholder:text-gray-600 border-b-gray-600 focus:border-b-white outline-none transition-all duration-300 ease-in-out"
            />
            {error.apellido && (
              <p className="text-red-500 text-sm">{error.apellido}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 relative">
          <label className="text-white font-oswald text-[14px] ">
            Tipo entrega
          </label>
          <RadioGroup name="tipoEntrega" orientation="horizontal">
            <Radio
              checked={formdata.tipoEntrega === "Retiro"}
              name="tipoEntrega"
              value="Retiro"
              onChange={handleOnChange}
            >
              <span className="text-white text-[12px] font-oswald">Retiro</span>
            </Radio>
            <Radio
              checked={formdata.tipoEntrega === "Envio"}
              name="tipoEntrega"
              value="Envio"
              onChange={handleOnChange}
            >
              <span className="text-white font-oswald text-[12px]">Envio</span>
            </Radio>
          </RadioGroup>
          {error.tipoEntrega && (
            <p className="text-red-500 text-sm">{error.tipoEntrega}</p>
          )}
        </div>

        <div
          className={`${
            formdata.tipoEntrega === "Envio"
              ? "flex flex-col w-full gap-2 relative"
              : "hidden"
          }`}
        >
          <h2 className="font-oswald text-white text-[14px]">Costo de envío</h2>
          <RadioGroup name="envio">
            <Radio
              type="number"
              checked={formdata.envio === 3500}
              name="envio"
              value={3500}
              onChange={handleOnChange}
            >
              <span className="text-white font-oswald text-[12px]">
                San Juan, Capital - <label className="font-bold">$3500</label>
              </span>
            </Radio>
            <Radio
              type="number"
              checked={formdata.envio === 6000}
              name="envio"
              value={6000}
              onChange={handleOnChange}
            >
              <span className="text-white font-oswald text-[12px]">
                Rivadavia, Chimbas, Santa Lucia,Rawson -{" "}
                <label className="font-bold">$6000</label>
              </span>
            </Radio>
            <Radio
              type="number"
              checked={formdata.envio === 9900}
              name="envio"
              value={9900}
              onChange={handleOnChange}
            >
              <span className="text-white font-oswald text-[12px]">
                Departamentos alejados, San Juan -{" "}
                <label className="font-bold">$9900</label>
              </span>
            </Radio>
          </RadioGroup>
          {error.envio && <p className="text-red-500 text-sm">{error.envio}</p>}
        </div>
        <div
          className={`${
            formdata.tipoEntrega === "Envio" ? "flex" : "hidden"
          } flex-col w-full gap-2 relative`}
        >
          <span className="text-white font-oswald text-[14px]">Domicilio</span>
          <input
            name="domicilio"
            onChange={handleOnChange}
            type="text"
            className="bg-transparent text-sky-500 border-b-1 text-[12px] placeholder:text-[12px] placeholder:text-gray-600 border-b-gray-600 focus:border-b-white outline-none transition-all duration-300 ease-in-out"
          />
          {error.domicilio && (
            <p className="text-red-500 text-sm">{error.domicilio}</p>
          )}
        </div>
        <div
          className={`${
            formdata.tipoEntrega === "Envio" ? "flex" : "hidden"
          } flex-col w-full gap-2 relative`}
        >
          <span className="text-white font-oswald text-[14px]">Localidad</span>
          <select
            name="localidad"
            onChange={handleOnChange}
            className="bg-transparent border-b-1 text-sky-500 text-[12px] placeholder:text-[12px] placeholder:text-gray-600 border-b-gray-600 focus:border-b-white outline-none transition-all duration-300 ease-in-out"
          >
            {selectDepartamentos.map((select) => (
              <option
                value={select.label}
                className="text-[12px] bg-black"
                key={select.id}
              >
                {select.label}
              </option>
            ))}
          </select>
          {error.localidad && (
            <p className="text-red-500 text-sm">{error.localidad}</p>
          )}
        </div>
        <div
          className={`${
            formdata.tipoEntrega === "Envio" ? "flex" : "hidden"
          } flex-col w-full gap-2 relative`}
        >
          <label className="text-white font-oswald text-[14px]">
            Codigo Postal
          </label>
          <input
            name="codigoPostal"
            onChange={handleOnChange}
            type="number"
            className="bg-transparent border-b-1 text-[12px] text-sky-500 placeholder:text-[12px] placeholder:text-gray-600 border-b-gray-600 focus:border-b-white outline-none transition-all duration-300 ease-in-out"
          />
          {error.codigoPostal && (
            <p className="text-red-500 text-sm">{error.codigoPostal}</p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2 relative">
          <label className="text-white font-oswald text-[14px]">Telefono</label>
          <input
            name="telefono"
            onChange={handleOnChange}
            type="number"
            className="bg-transparent border-b-1 text-[12px] text-sky-500 placeholder:text-[12px] placeholder:text-gray-600 border-b-gray-600 focus:border-b-white outline-none transition-all duration-300 ease-in-out"
          />
          {error.telefono && (
            <p className="text-red-500 text-sm">{error.telefono} </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2 relative">
          <label className="text-white font-oswald text-[14px]">
            Dirección de correo electrónico
          </label>
          <input
            name="email"
            onChange={handleOnChange}
            type="email"
            className="bg-transparent border-b-1 text-[12px] text-sky-500 placeholder:text-[12px] placeholder:text-gray-600 border-b-gray-600 focus:border-b-white outline-none transition-all duration-300 ease-in-out"
          />
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
        </div>
        <h3 className="text-white font-poppins text-[22px] font-semibold">
          Tu pedido
        </h3>

        <table className="w-full border-collapse border border-gray-600 border-opacity-5 ">
          <thead className="border-collapse border border-gray-600 border-opacity-5">
            <tr className="font-oswald text-white text-[15px]">
              <th className="w-[60%] text-start px-2">Producto</th>
              <th className="text-start ">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((carrito) => (
              <tr key={carrito.id} className="">
                <td>
                  <div className="flex items-center gap-1">
                    <span className="text-white text-[14px] px-2">
                      {carrito.title}
                    </span>
                    <span className="font-semibold text-white text-[14px]">
                      x
                    </span>
                    <span className="text-white font-semibold text-[14px]">
                      {carrito.cantidad}
                    </span>
                  </div>
                </td>
                <td className="text-start text-white text-[14px]  font-oswald">
                  {convertArs(carrito.price)}
                </td>
              </tr>
            ))}
            <tr>
              <td className=" font-oswald text-white font-semibold text-[14px] px-2">
                Subtotal
              </td>
              <td
                className={`font-oswald font-semibold text-start text-[14px] text-white ${
                  user?.rol === "usuario" ? "line-through" : ""
                }`}
              >
                {totalWidget()}
              </td>
            </tr>
            <tr
              className={`${formdata.tipoEntrega === "Retiro" ? "hidden" : ""}`}
            >
              <td className="text-white font-oswald text-[14px] font-semibold px-2">
                Envío
              </td>
              <td className="text-start text-white text-[14px] font-oswald">
                {convertArs(formdata.envio)}
              </td>
            </tr>

            <tr>
              <td className="text-white font-oswald text-[14px] font-semibold px-2">
                Total
              </td>
              <td className="text-start text-white font-oswald text-[14px] font-semibold">
                {user?.rol === "usuario" ? totalWidget2() : totalWidget()}
              </td>
            </tr>
          </tbody>
        </table>
        <RadioGroup name="metodoPago">
          <Radio
            name="metodoPago"
            checked={formdata.metodoPago === "mercadoPago-basic"}
            onChange={handleOnChange}
            value="mercadoPago-basic"
            id="metodo"
            className="peer/metodo"
          >
            <label className="text-white flex items-center gap-2 text-[14px]">
              Pagos sin Tarjeta de Mercado Pago{" "}
              <img src="/images/icon-mp.png" className="w-5 h-5" />
            </label>
          </Radio>

          <div
            className={`${
              formdata.metodoPago === "mercadoPago-basic"
                ? "   mercadoPago-Basic     bg-gray-500/60 p-6 before:max-h-340"
                : "exit-mercadoPago "
            } transition-all ease-in-out duration-500 `}
          >
            <div className="bg-white p-6 flex flex-col gap-10">
              <h2 className="font-poppins">
                Compra en hasta 12 pagos sin tarjeta de crédito
              </h2>

              <ol className="flex flex-col items-start gap-2 text-[12px]">
                <li className="text-gray-500">
                  <span className="text-blue-500 font-semibold">1.</span>{" "}
                  <label className="text-[#0000008C] font-semibold">
                    Conoce el límite disponible
                  </label>{" "}
                  de tu Línea de Crédito y{" "}
                  <lable className="text-[#0000008C] font-semibold">
                    selecciona la cantidad de pagos.
                  </lable>
                </li>
                <li className="text-gray-500">
                  <span className="text-blue-500 font-semibold">2.</span>{" "}
                  <label className="text-[#0000008C] font-semibold">
                    Confirma tu pago,
                  </label>{" "}
                  se acredita al instante y está 100% protegido.
                </li>
                <li className="text-gray-500">
                  <span className="text-blue-500 font-semibold">3.</span>{" "}
                  <label className="text-[#0000008C] font-semibold">
                    Paga mes a mes
                  </label>{" "}
                  desde la app de Mercado Pago con el medio que prefieras.
                </li>
              </ol>

              <div className="p-4 text-[12px]">
                <p className="flex items-center gap-2 text-[#0000008C] font-semibold">
                  <img src="/assets/redirect-logo.svg" className="w-5 h-5" />
                  Te llevaremos a Mercado Pago.
                </p>
                <p className="text-gray-500">
                  Si aún no tienes la Línea de Crédito, actívalo al momento de
                  pagar.
                </p>
              </div>
            </div>
          </div>
          <Radio
            onChange={handleOnChange}
            name="metodoPago"
            value="tarjeta"
            checked={formdata.metodoPago === "tarjeta"}
          >
            {" "}
            <label className="text-white flex items-center gap-2 text-[14px]">
              Pagos con Tarjeta de Mercado Pago en hasta 3 y 6 cuotas sin
              interes
              <img src="/images/icon-mp.png" className="w-5 h-5" />
            </label>
          </Radio>
          <div
            className={`${
              formdata.metodoPago === "tarjeta"
                ? "   mercadoPago-Basic     bg-gray-500/60 p-6 text-[12px]"
                : "exit-mercadoPago "
            } transition-all ease-in-out duration-500 `}
          >
            <div className="bg-white p-6 flex flex-col gap-10">
              <h2 className="font-poppins text-center text-[16px]">
                Descubre la practicidad de Mercado Pago
              </h2>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src="/assets/wallet.svg" className="w-5 h-5" />
                  <p className="text-gray-500 ">
                    <span className="text-[#0000008C] font-semibold">
                      Paga con tus tarjetas guardadas
                    </span>{" "}
                    o dinero disponible sin completar datos.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <img src="/assets/shield.svg" className="w-5 h-5" />
                  <p className="text-gray-500 ">
                    <span className="text-[#0000008C] font-semibold">
                      Paga con tus tarjetas guardadas
                    </span>{" "}
                    o dinero disponible sin completar datos.
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-2">
                <img
                  src="/assets/visa.svg"
                  className="w-5 h-5 border-1 border-gray-300 shadow-lg"
                  alt="Visa"
                />
                <img
                  src="/assets/master.svg"
                  className="w-5 h-5 border-1 border-gray-300 shadow-lg"
                  alt="Master"
                />
                <img
                  src="/assets/amex.svg"
                  className="w-5 h-5 border-1 border-gray-300 shadow-lg"
                  alt="Amex"
                />
                <img
                  src="/assets/naranja.svg"
                  className="w-5 h-5 border-1 border-gray-300 shadow-lg"
                  alt="Naranja"
                />
                <img
                  src="/assets/maestro.svg"
                  className="w-5 h-5 border-1 border-gray-300 shadow-lg"
                  alt="Maestro"
                />
                <img
                  src="/assets/cabal.svg"
                  className="w-5 h-5 border-1 border-gray-300 shadow-lg"
                  alt="Cabal"
                />
                <img
                  src="/assets/account-money.svg"
                  className="w-5 h-5 border-1 border-gray-300 shadow-lg"
                  alt="Account Money"
                />
              </div>

              <div className="p-4 text-[12px] flex flex-col items-center">
                <p className="flex items-center gap-2 text-[#0000008C] font-semibold">
                  <img src="/assets/redirect-logo.svg" className="w-5 h-5" />
                  Te llevaremos a Mercado Pago.
                </p>
                <p className="text-gray-500">
                  Si no tienes una cuenta, puedes usar tu e-mail..
                </p>
              </div>
            </div>
          </div>
          {/* <Radio
            name="metodoPago"
            value="transferencia"
            onChange={handleOnChange}
            checked={formdata.metodoPago === "transferencia"}
          >
            <label className="text-white text-[14px]">
              Transferencia Bancaria
            </label>
          </Radio> */}

          {/* <div
            className={`${
              formdata.metodoPago === "transferencia"
                ? "   mercadoPago-Basic     bg-gray-500/60 p-6 text-[12px]"
                : "exit-mercadoPago "
            } transition-all ease-in-out duration-500 `}
          >
            <div className="flex flex-col gap-5 bg-white p-4 text-gray-700">
              <p>
                Realizá el pago directamente a nuestra cuenta bancaria. <br />
                Por favor, usá el número de pedido como referencia de pago.
                <br /> Tu pedido no se procesará hasta que el importe haya sido
                acreditado. <br /> Moreno Marina Natalia <br /> CVU:
                0720218888000032403572 <br /> Alias: CHAPA.CARDO.MIMO <br />{" "}
                CUIT/CUIL: 2725394354 <br /> 🟢 Una vez realizado el pago,
                envianos el comprobante por WhatsApp para agilizar el proceso de
                tu pedido.
              </p>
            </div>
          </div> */}
        </RadioGroup>
        {error.metodoPago && (
          <p className="text-red-500 text-sm">{error.metodoPago}</p>
        )}

        <div className="  flex flex-col gap-5 relative  md:flex-row justify-between">
          <p className="text-white text-[14px]">
            Tus datos personales se utilizarán para procesar tu pedido.
          </p>
          <button
            type="submit"
            className="bg-sky-500 flex justify-center items-center px-2 py-2 font-poppins text-center   hover:text-white hover:bg-sky-400 ease-in-out transition-all duration-300 "
          >
            <span>Realizar pedido</span>
            {arrowRight}
          </button>
        </div>
      </form>
    </div>
  );
};
