import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { useForm } from "react-hook-form";
const Contacto = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center gap-5  items-center  ">
      <h1 className="text-white text-[40px] font-playfair mt-20 ">
        Contactanos
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-5 w-full max-w-md p-[20px] rounded-2xl bg-black/90"
      >
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <input
            placeholder="Nombre"
            className="flex-1 outline-none bg-transparent border-b border-gray-600 placeholder:text-gray-400 focus:border-b-sky-500 text-white"
            {...register("name", { required: true })}
          />
          <input
            placeholder="Apellido"
            className="flex-1 outline-none bg-transparent border-b border-gray-600 placeholder:text-gray-400 focus:border-b-sky-500 text-white"
            {...register("apellido", { required: true })}
          />
        </div>

        <input
          placeholder="Correo electrónico"
          className="w-full outline-none bg-transparent border-b border-gray-600 placeholder:text-gray-400 focus:border-b-sky-500 text-white"
          {...register("email", { required: true })}
        />

        <textarea
          rows="7"
          className="w-full p-4 bg-transparent outline-none  border-b transition-all ease-in-out border-gray-600 placeholder:text-gray-400 text-white focus:border-b-sky-500 "
          placeholder="Escriba el mensaje aquí"
          {...register("mensaje")}
        />

        <Checkbox {...register("newsletter")} name="newsletter" defaultSelected>
          <h2 className="text-white text-sm">
            ¿Le gustaría recibir promociones?
          </h2>
        </Checkbox>

        <button
          type="submit"
          className="text-white px-6 py-2 border border-sky-500 rounded-full hover:bg-sky-500 font-semibold transition-all"
        >
          Enviar
        </button>
      </form>
      <div className=" flex  gap-5">
        <div className="text-white font-poppins flex flex-col gap-10 w-[500px]  ">
          <h2 className="text-[30px] text-[#D4AF37]">
            ¡Descubrí el brillo de la elegancia con{" "}
            <span className="text-[30px] text-sky-500">Chelitas Joyas</span>!
          </h2>
          <p>
            Encontrá la joya ideal con{" "}
            <span className="text-sky-500">calidad</span>,{" "}
            <span className="text-sky-500">exclusividad</span> y el mejor
            servicio personalizado.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="group bg-black/90 px-5 py-4 rounded-xl flex items-center gap-4 shadow-md hover:shadow-lg transition-all duration-300 border-b-3 border-sky-300 hover:border-sky-500">
            <div className="bg-gradient-to-br from-sky-400 to-sky-500 rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <svg
                className="text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zM20 8l-7.475 4.675q-.125.075-.262.113t-.263.037t-.262-.037t-.263-.113L4 8v10h16zm-8 3l8-5H4zM4 8v.25v-1.475v.025V6v.8v-.012V8.25zv10z"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-medium transition-colors duration-300 group-hover:text-white">
              chelitajoyas@gmail.com
            </span>
          </div>

          {/* Phone Card */}
          <div className="group bg-black/90 px-5 py-4 rounded-xl flex items-center gap-4 shadow-md hover:shadow-lg transition-all duration-300 border-b-3 border-sky-300 hover:border-sky-500">
            <div className="bg-gradient-to-br from-sky-400 to-sky-500 rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <svg
                className="text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M17.707 12.293a1 1 0 0 0-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a1 1 0 0 0 0-1.414l-4-4a1 1 0 0 0-1.414 0L3.581 5.005c-.38.38-.594.902-.586 1.435c.023 1.424.4 6.37 4.298 10.268s8.844 4.274 10.269 4.298h.028c.528 0 1.027-.208 1.405-.586l2.712-2.712a1 1 0 0 0 0-1.414zm-.127 6.712c-1.248-.021-5.518-.356-8.873-3.712c-3.366-3.366-3.692-7.651-3.712-8.874L7 4.414L9.586 7L8.293 8.293a1 1 0 0 0-.272.912c.024.115.611 2.842 2.271 4.502s4.387 2.247 4.502 2.271a.99.99 0 0 0 .912-.271L17 14.414L19.586 17z"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-medium tracking-tighter group-hover:text-white transition-all ease-in-out">
              +54 9 264 410-6566
            </span>
          </div>

          {/* Address Card */}
          <div className="group bg-black/90 px-5 py-4 rounded-xl flex items-center gap-4 shadow-md hover:shadow-lg transition-all duration-300 border-b-3 border-sky-300 hover:border-sky-500">
            <div className="bg-gradient-to-br from-sky-400 to-sky-500 rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <svg
                className="text-white"
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
                  strokeWidth="2"
                >
                  <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
                  <path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0" />
                </g>
              </svg>
            </div>
            <span className="text-gray-700 font-medium group-hover:text-white transition-all ease-in-out">
              Avenida España 4654 Sur, San Juan
            </span>
          </div>

          {/* Social Media - Enhanced */}
          <div className="flex gap-6 mt-8 justify-center md:justify-start">
            <a
              href="https://google.com"
              className="group h-12 w-12 bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-amber-500 hover:scale-110 hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white group-hover:text-white"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256c0 120 82.7 220.8 194.2 248.5V334.2h-52.8V256h52.8v-33.7c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287v175.9C413.8 494.8 512 386.9 512 256"
                />
              </svg>
            </a>
            <a
              href="https://google.com"
              className="group h-12 w-12 bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-amber-500 hover:scale-110 hover:shadow-md"
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
              >
                <path
                  fill="currentColor"
                  d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7s-7-3.13-7-7s3.13-7 7-7M5.72 10.69c3.1 0 4.8-2.57 4.8-4.8v-.22c.33-.24.62-.54.84-.88c-.3.13-.63.22-.97.27c.35-.21.62-.54.74-.93c-.33.19-.69.33-1.07.41c-.31-.33-.75-.53-1.23-.53c-.93 0-1.69.76-1.69 1.69c0 .13.01.26.05.38c-1.4-.07-2.65-.74-3.48-1.76c-.14.25-.23.54-.23.85c0 .58.3 1.1.75 1.4c-.28 0-.54-.08-.76-.21v.02c0 .82.58 1.5 1.35 1.66c-.14.04-.29.06-.44.06c-.11 0-.21-.01-.32-.03c.21.67.84 1.16 1.57 1.17c-.58.45-1.31.72-2.1.72c-.14 0-.27 0-.4-.02c.74.48 1.63.76 2.58.76"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/natalia_joyeria/"
              className="group h-12 w-12 bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-amber-500 hover:scale-110 hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white group-hover:text-white"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M13 10a3 3 0 1 1-6 0q.001-.257.049-.5H6v3.997c0 .278.225.503.503.503h6.995a.503.503 0 0 0 .502-.503V9.5h-1.049q.048.243.049.5m-3 2a2 2 0 1 0-.001-4.001A2 2 0 0 0 10 12m2.4-4.1h1.199a.3.3 0 0 0 .301-.3V6.401a.3.3 0 0 0-.301-.301H12.4a.3.3 0 0 0-.301.301V7.6c.001.165.136.3.301.3M10 .4A9.6 9.6 0 0 0 .4 10a9.6 9.6 0 0 0 9.6 9.6a9.6 9.6 0 0 0 9.6-9.6A9.6 9.6 0 0 0 10 .4m5 13.489C15 14.5 14.5 15 13.889 15H6.111C5.5 15 5 14.5 5 13.889V6.111C5 5.5 5.5 5 6.111 5h7.778C14.5 5 15 5.5 15 6.111z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
