import { useForm } from "react-hook-form";
const Contacto = () => {
  const { register, handleSubmit } = useForm();
  const enviar = (data) => {
    console.log(data);
  };
  return (
    <div className="h-screen flex flex-col w-full gap-[150px] ">
      <h1 className="font-semibold text-white text-[40px] text-center mt-[50px]  sm:mt-[50px]">
        Dejanos tu informacion para contactarte
      </h1>
      <form
        onSubmit={handleSubmit(enviar)}
        className="flex flex-col bg-[#000] items-center justify-center gap-11 mt-[100px]  border border-sky-500 h-[45%] max-w-[350px] m-auto rounded-[25px]"
      >
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          {...register("nombre")}
          className="px-1 py-2 w-[70%] border-b-2 border-gray-700 bg-gray-900  text-lg outline-none text-white font-semibold placeholder:text-cyan-500 focus:border-gray-400 transition duration-0.5"
        ></input>
        <input
          type="text"
          placeholder="Ingresa tu apellido"
          {...register("apellido")}
          className="px-1 py-2 w-[70%] border-b-2 border-gray-700 bg-gray-900  text-lg outline-none text-white font-semibold placeholder:text-cyan-500 focus:border-gray-400 transition duration-0.5"
        ></input>
        <input
          {...register("email")}
          type="email"
          placeholder="Ingresa tu email"
          className="px-1 py-2 w-[70%] border-b-2 border-gray-700 bg-gray-900 text-white font-semibold  outline-none  text-lg  placeholder:text-cyan-500 focus:border-gray-400 transition duration-0.5 "
        ></input>
        <button
          type="submit"
          className=" py-2 border border-sky-500 bg-sky-400 w-[25%] text-center rounded-lg text-white font-semibold hover:cursor-pointer  hover:bg-gray-900 transition duration-0.5"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;
