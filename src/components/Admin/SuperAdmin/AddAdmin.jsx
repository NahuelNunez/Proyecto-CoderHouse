import { Controller, useForm } from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { useState } from "react";
import { useUser } from "../../User/Store/useUser";
import { toast } from "react-toastify";

export const AddAdmin = ({
  getAdmines,
  openEye,
  closeEye,
  iconEdit,
  admin,
  user,
  operador,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [showpassword, setShowpassword] = useState(false);

  const { postSingUp, editUser } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const editAdmin = (admin, operador) => {
    if (admin) {
      setValue("nombre", admin.nombre);
      setValue("apellido", admin.apellido);
      setValue("email", admin.email);
      setValue("rol", admin.rol);
    } else if (operador) {
      setValue("nombre", operador.nombre);
      setValue("apellido", operador.apellido);
      setValue("email", operador.email);
      setValue("rol", operador.rol);
    }
    onOpen();
  };

  const onSubmit = async (data) => {
    try {
      if (admin) {
        const { data: dataOk, error: errroAdmin } = await editUser(
          admin.id,
          user?.token,
          data
        );
        if (errroAdmin) {
          toast.error("Error al editar el Administrador");
        } else if (dataOk) {
          toast.success("Administrador editado exitosamente");
          getAdmines();
          onClose();
        }
      } else if (operador) {
        const { data: dataOk, error: errorOperador } = await editUser(
          operador.id,
          user?.token,
          data
        );
        if (errorOperador) {
          toast.error("Error al editar el operador");
        } else if (dataOk) {
          getAdmines();
          onClose();
          toast.success("Operador editado exitosamente");
        }
      } else {
        if (data.rol === "admin") {
          const { data: dataOk, error: errorData } = await postSingUp(data);
          if (dataOk) {
            toast.success("Administrador creado exitosamente");
            getAdmines();
            reset();
            onClose();
          } else if (errorData) {
            toast.error(errorData);
            getAdmines();
            reset();
            onClose();
          }
        } else if (data.rol === "operador") {
          const { data: dataOk, error: errorData } = await postSingUp(data);
          if (dataOk) {
            toast.success("Operador creado exitosamente");
            getAdmines();
            reset();
            onClose();
          } else if (errorData) {
            toast.error(errorData);
            getAdmines();
            reset();
            onClose();
          }
        }
      }
    } catch (error) {
      if (admin) {
        toast.error("Error al editar el Administrador");
        console.log("Error al editar el Administrador", error);
      }
      toast.error("Error al crear Operador");
      console.log("Error al crear Operador", error);
    }
  };
  return (
    <>
      <button
        onClick={() => {
          editAdmin(admin, operador);
        }}
        className={`${
          admin || operador
            ? `text-blue-500  ${
                admin?.inhabilitado === true || operador?.inhabilitado === true
                  ? "text-gray-400 hover:text-blue-500 transition-all duration-300 ease-in-out"
                  : "text-blue-500"
              }`
            : "text-white font-poppins bg-black rounded-full px-4 py-3 scale-90 hover:scale-100 hover:text-black hover:bg-sky-400 transition-all duration-300 ease-in-out"
        }`}
      >
        {admin?.nombre || operador?.nombre
          ? iconEdit
          : "Agregar Administrador / Operador"}
      </button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent className="bg-black">
          <>
            <ModalHeader className="flex flex-col gap-1">
              {admin?.rol === "admin" && (
                <h2 className="text-white text-center">Editar Administrador</h2>
              )}
              {operador?.rol === "operador" && (
                <h2 className="text-white text-center">Editar Operador</h2>
              )}
              {admin === undefined && operador === undefined && (
                <h2 className="text-white text-center">
                  Agregar Administrador / Operador
                </h2>
              )}
            </ModalHeader>
            <ModalBody>
              {admin || operador ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  <div className="relative">
                    <input
                      type="text"
                      {...register("nombre", {
                        required: true,
                      })}
                      placeholder="Nombre"
                      className="outline-none w-full p-1 border-b-2 bg-transparent placeholder:text-sm  text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300"
                    />
                    {errors.nombre && (
                      <p className="text-red-500 text-sm">
                        {errors.nombre.message}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      className="outline-none w-full p-1 border-b-2 bg-transparent placeholder:text-sm  text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300"
                      {...register("apellido", {
                        required: true,
                      })}
                      placeholder="Apellido"
                    />
                    {errors.apellido && (
                      <p className="text-red-500 text-sm">
                        {errors.apellido.message}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      placeholder="Email"
                      type="email"
                      {...register("email", {
                        required: true,
                      })}
                      className="outline-none w-full p-1 border-b-2 bg-transparent placeholder:text-sm  text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm ">
                        {errors.email
                          ? errors.email.message
                          : "El email es requerido"}
                      </p>
                    )}
                  </div>
                  <div className="w-full relative group">
                    <input
                      type={showpassword ? "text" : "password"}
                      placeholder="Contraseña"
                      className="outline-none bg-transparent w-full p-1 border-b-2 placeholder:text-sm text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300"
                      {...register("password")}
                    />

                    <button
                      type="button"
                      onClick={() => setShowpassword(!showpassword)}
                      className="absolute  text-white right-2 top-2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-all duration-300 ease-in-out"
                    >
                      {showpassword ? openEye : closeEye}
                    </button>
                  </div>
                  <Controller
                    control={control}
                    name="rol"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <RadioGroup
                        orientation="horizontal"
                        {...register("rol", { required: true })}
                        label="Tipo"
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                      >
                        <Radio {...register("rol")} value="admin">
                          <h2 className="text-white">Administrador</h2>
                        </Radio>
                        <Radio {...register("rol")} value="operador">
                          <h2 className="text-white">Operador</h2>
                        </Radio>
                      </RadioGroup>
                    )}
                  />

                  <ModalFooter className="flex items-center justify-center gap-4">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit">
                      Editar
                    </Button>
                  </ModalFooter>
                </form>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  <div className="relative">
                    <input
                      type="text"
                      {...register("nombre", {
                        required: "El nombre es obligatorio",
                        pattern: {
                          value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,}$/,
                          message: "Solo letras y mínimo 2 caracteres",
                        },
                      })}
                      placeholder="Nombre"
                      className="outline-none w-full p-1 border-b-2 bg-transparent placeholder:text-sm  text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300"
                    />
                    {errors.nombre && (
                      <p className="text-red-500 text-sm">
                        {errors.nombre.message}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      className="outline-none w-full p-1 border-b-2 bg-transparent placeholder:text-sm  text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300"
                      {...register("apellido", {
                        required: "El apellido es obligatorio",
                        pattern: {
                          value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,}$/,
                          message: "Solo letras y mínimo 2 caracteres",
                        },
                      })}
                      placeholder="Apellido"
                    />
                    {errors.apellido && (
                      <p className="text-red-500 text-sm">
                        {errors.apellido.message}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      placeholder="Email"
                      type="email"
                      {...register("email", {
                        required: "El email es obligatorio",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Email no válido",
                        },
                      })}
                      className="outline-none w-full p-1 border-b-2 bg-transparent placeholder:text-sm  text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm ">
                        {errors.email
                          ? errors.email.message
                          : "El email es requerido"}
                      </p>
                    )}
                  </div>
                  <div className="w-full relative group">
                    <input
                      type={showpassword ? "text" : "password"}
                      placeholder="Contraseña"
                      className="outline-none bg-transparent w-full p-1 border-b-2 placeholder:text-sm text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300"
                      {...register("password", {
                        required: "La contraseña es obligatoria",
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                          message:
                            "Mínimo 6 caracteres, al menos una letra y un número",
                        },
                      })}
                    />

                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowpassword(!showpassword)}
                      className="absolute  text-white right-2 top-2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-all duration-300 ease-in-out"
                    >
                      {showpassword ? openEye : closeEye}
                    </button>
                  </div>
                  <RadioGroup
                    orientation="horizontal"
                    defaultValue="admin"
                    {...register("rol", { required: true })}
                  >
                    <Radio {...register("rol")} value="admin">
                      <h2 className="text-white">Administrador</h2>
                    </Radio>
                    <Radio {...register("rol")} value="operador">
                      <h2 className="text-white">Operador</h2>
                    </Radio>
                  </RadioGroup>
                  <ModalFooter className="flex items-center justify-center gap-4">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit">
                      Agregar
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
