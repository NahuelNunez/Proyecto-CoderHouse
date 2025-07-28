import { Input } from "@heroui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../components/Admin/Store/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const { changePassword, user, logout } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [matchPassword, setMatchPassword] = useState("");
  const [actualPass, setActualPass] = useState("");
  const [actual, setActual] = useState("");

  const onSubmit = async (data) => {
    const { passwordActual, passwordNew, confirmPassword } = data;

    const DatosEnviar = {
      actual: passwordActual,
      nueva: passwordNew,
    };
    console.log(DatosEnviar);

    if (passwordNew !== confirmPassword) {
      setMatchPassword("La contraseña no coincide");
      setTimeout(() => {
        setMatchPassword("");
      }, 4000);
      return;
    } else if (passwordActual === passwordNew) {
      setActualPass("La contraseña es la misma que la actual");
      setTimeout(() => {
        setActualPass("");
      }, 4000);
      return;
    }

    try {
      const response = await changePassword(user?.token, DatosEnviar);

      if (response.error) {
        setActual("La contraseña actual es incorrecta");
        setTimeout(() => {
          setActual("");
        }, 4000);
        return;
      }
      toast.success("Contraseña cambiada exitosamente😎");
      logout();
      navigate(`/login`);
    } catch (error) {
      toast.error("Error al cambiar la contraseña🙃");
      console.error("Error al cambiar la contraseña", error);
    }

    reset();
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-[1000px] min-w-[320px] md:w-auto m-4 p-6 rounded-lg flex flex-col justify-center items-center lg:gap-10 gap-16 bg-black/90 "
      >
        <h2 className="text-white text-center  font-playfair text-[40px] mb-10">
          Cambiar Contraseña
        </h2>
        <div className="relative w-[70%] ">
          <Input
            autoFocus
            type="password"
            {...register("passwordActual", { required: true })}
            label="Contraseña actual"
            className=""
          />
          {errors.passwordActual && (
            <p className="text-red-500 absolute">
              La contraseña actual es requerida
            </p>
          )}
          {actual && (
            <p className="text-red-500 absolute ">
              La contraseña actual es incorrecta
            </p>
          )}
        </div>
        <div className="relative w-[70%] ">
          <Input
            type="password"
            {...register("passwordNew", { required: true })}
            label="Contraseña nueva"
            className=""
          />
          {actualPass && <p className="text-red-500 absolute">{actualPass}</p>}
          {errors.passwordNew && (
            <p className="text-red-500 absolute">
              La contraseña nueva es requerida
            </p>
          )}
        </div>
        <div className="relative w-[70%] ">
          <Input
            type="password"
            {...register("confirmPassword", { required: true })}
            label="Confirmar contraseña"
            className=""
          />
          {matchPassword && (
            <p className="text-red-500 absolute">{matchPassword}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-sky-600 p-3 rounded-full font-semibold scale-90 hover:scale-100 hover:text-white hover:bg-sky-500 transition-all ease-in-out duration-300"
        >
          Cambiar contraseña
        </button>
      </form>
    </div>
  );
};
