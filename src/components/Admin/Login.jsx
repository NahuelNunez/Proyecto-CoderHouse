import { Input } from "@heroui/react";
import { UseForm } from "../../hooks/UseForm";

import { useState } from "react";

import { toast } from "react-toastify";
import { useAuth } from "./Store/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { UserLocalStorage } from "../../hooks/UserLocalStorage";

export const Login = () => {
  const navigate = useNavigate();
  UserLocalStorage();
  const { login, user } = useAuth();

  const { handleChange, reset, formData, validate, error } = UseForm({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: userData, error: loginError } = await login(formData);
      if (loginError) {
        toast.error(loginError);
        console.error("Error al iniciar sesión:", loginError);
        return;
      }
      if (userData) {
        toast.success("Login exitoso");
        reset();
        navigate("/");
      } else {
        toast.error("Error al iniciar sesion");
      }
    } catch (error) {
      console.error("Error al iniciar sesion", error);
    }
  };

  return (
    <div className=" relative flex flex-col w-full   justify-center items-center min-h-screen">
      <form
        className=" flex flex-col  lg:w-[500px] min-w-80 lg:max-w-[25%]  gap-10   bg-black/90 justify-between items-center p-10 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-[30px] text-white font-playfair font-semibold ">
          Iniciar Sesion
        </h2>

        <div className="relative w-full">
          <Input
            onChange={handleChange}
            name="email"
            value={email}
            label="Email"
            type="email"
          />
          {error.email && (
            <p className="text-red-500 text-sm font-poppins absolute mt-2">
              {error.email}
            </p>
          )}
        </div>
        <div className="relative w-full">
          <Input
            onChange={handleChange}
            label="Contraseña"
            name="password"
            type="password"
            value={password}
          />
          {error.password && (
            <p className="text-red-500 text-sm font-poppins absolute mt-2">
              {error.password}
            </p>
          )}
        </div>
        <h4 className="text-white hover:underline hover:cursor-pointer">
          <Link to="/register">¿Aun no tenes cuenta?</Link>
        </h4>
        <button
          type="submit"
          className="bg-sky-600 p-2 w-[40%] lg:w-[40%] px-2 rounded-full text-[18px] font-semibold hover:text-white  duration-300 transition-all hover:scale-100 scale-90 hover:bg-transparent hover: border border-sky-500"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};
