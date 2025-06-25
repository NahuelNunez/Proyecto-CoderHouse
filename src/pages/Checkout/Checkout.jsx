import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../components/context/CartContext";

export const Checkout = () => {
  const { postData } = useContext(CartContext);
  const pasos = [
    {
      path: "metodo-pago",
      label: "Metodo de pago",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 14 14"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 4.5V3M5.5 8.5c0 .75.67 1 1.5 1s1.5 0 1.5-1c0-1.5-3-1.5-3-3c0-1 .67-1 1.5-1s1.5.38 1.5 1M7 9.5V11" />
            <circle cx="7" cy="7" r="6.5" />
          </g>
        </svg>
      ),
    },
    {
      path: "entrega",
      label: "Entrega",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 14 14"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 .5v4M8.5 11H11M.5 4.5h13v8a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-8h0Z" />
            <path d="M.5 4.5L2 1.61A2 2 0 0 1 3.74.5h6.52a2 2 0 0 1 1.79 1.11L13.5 4.5" />
          </g>
        </svg>
      ),
    },
    {
      path: "transferencia",
      label: "Transferencia",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="m356.687 228.687l22.626 22.626L494.627 136L379.313 20.687l-22.626 22.626L433.372 120H16v32h417.372zM496 360H78.628l76.685-76.687l-22.626-22.626L17.373 376l115.314 115.313l22.626-22.626L78.628 392H496z"
          />
        </svg>
      ),
    },
    {
      path: `resumen/${postData?.OrderId}/${
        postData?.userToken ? postData?.userToken : postData?.SessionId
      }`,
      label: "Resumen",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <path d="M12 11h5m-5-4h5m-9 8V3.6a.6.6 0 0 1 .6-.6h11.8a.6.6 0 0 1 .6.6V17a4 4 0 0 1-4 4v0" />
            <path d="M5 15h7.4c.331 0 .603.267.63.597C13.153 17.115 13.78 21 17 21H6a3 3 0 0 1-3-3v-1a2 2 0 0 1 2-2" />
          </g>
        </svg>
      ),
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const [continuar, setContinuar] = useState(0);

  useEffect(() => {
    const currentIndex = pasos.findIndex((paso) =>
      location.pathname.includes(paso.path)
    );
    if (currentIndex !== -1) {
      setContinuar(currentIndex);
    }
  }, [location.pathname]);

  const handleContinuar = () => {
    const nextIndex = continuar + 1;

    if (nextIndex < pasos.length) {
      navigate(`/CHECKOUT/${pasos[nextIndex].path}`);
    }
  };

  const [pasoActual, setPasoActual] = useState("metodoPago");

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start gap-8 p-4  text-white">
      <div className="flex gap-3 flex-wrap justify-center relative lg:absolute top-[100px] bg-black/90 rounded-lg p-6">
        {pasos.map((paso, index) => {
          const isActive = location.pathname.includes(paso.path);
          const isEnabled = index <= continuar;

          return (
            <div key={paso.path} className="flex items-center gap-2">
              {isEnabled ? (
                <NavLink
                  to={`/CHECKOUT/${paso.path}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded transition ${
                    isActive
                      ? "text-sky-500 font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{paso.icon}</span>
                  <span className="text-sm">{paso.label}</span>
                </NavLink>
              ) : (
                <div className="flex  items-center gap-1 px-3 py-1 text-gray-600 cursor-not-allowed opacity-50">
                  <span className="text-lg">{paso.icon}</span>
                  <span className="text-lg">{paso.label}</span>
                </div>
              )}

              {index < pasos.length - 1 && (
                <span className="text-gray-500 ">──</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Outlet para los pasos */}
      <div className="w-full max-w-4xl">
        <Outlet context={{ handleContinuar, setPasoActual, pasoActual }} />
      </div>
    </div>
  );
};
