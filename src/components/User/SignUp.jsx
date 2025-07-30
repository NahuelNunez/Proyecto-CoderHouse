import { Input } from "@heroui/input";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUser } from "./Store/useUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignUp = () => {
  const [errorMensaje, setErrorMensaje] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { postSingUp } = useUser();

  const OnSubmit = async (data) => {
    try {
      const form = {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        password: data.password,
        rol: "usuario",
      };
      const response = await postSingUp(form);

      if (response.error) {
        setErrorMensaje("El email ya existe");
        setTimeout(() => {
          setErrorMensaje("");
        }, 4000);
        return;
      }

      toast.success("Usuario creado exitosamente😎");
    } catch (error) {
      console.log("Error al intentar registrarse", error);
    }
    reset();
    navigate("/login");
  };

  return (
    <div className="  flex flex-col justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(OnSubmit)}
        className="flex flex-col gap-12 items-center bg-black/90 rounded-xl md:w-[50%]  p-10"
      >
        <h2 className="text-white font-playfair font-semibold text-[30px]">
          Registrate
          <hr />
        </h2>
        <div className="w-full relative">
          <Input
            {...register("nombre", { required: true })}
            className="text-md"
            label="Nombre"
          />
          {errors.nombre && (
            <p className="absolute text-red-500 text-sm mt-2">
              El nombre es requerido
            </p>
          )}
        </div>
        <div className="w-full relative">
          <Input
            {...register("apellido", { required: true })}
            label="Apellido"
          />
          {errors.apellido && (
            <p className="absolute text-red-500 text-sm mt-2">
              El apellido es requerido
            </p>
          )}
        </div>
        <div className="w-full relative">
          <Input {...register("email", { required: true })} label="Email" />
          {errors.email && (
            <p className="absolute text-red-500 text-sm mt-2">
              El email es requerido
            </p>
          )}{" "}
          {errorMensaje && <p className="text-red-500 mt-2">{errorMensaje}</p>}
        </div>
        <div className="w-full relative">
          <Input
            {...register("password", { required: true })}
            label="Contraseña"
            type="password"
          />
          {errors.password && (
            <p className="absolute text-red-500 text-sm mt-2">
              La contraseña es requerida
            </p>
          )}
        </div>

        <button className="text-black font-semibold hover:text-white bg-sky-600 scale-90 hover:scale-100 transition-all  duration-200 p-3 rounded-full">
          Registrarse
        </button>
      </form>
    </div>
  );
};
