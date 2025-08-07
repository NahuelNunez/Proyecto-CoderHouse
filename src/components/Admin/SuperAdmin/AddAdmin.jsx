import { useForm } from "react-hook-form";
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
  } = useForm();

  const editAdmin = (admin) => {
    if (admin) {
      setValue("nombre", admin.nombre);
      setValue("apellido", admin.apellido);
      setValue("email", admin.email);
    }
    onOpen();
  };

  const onSubmit = async (data) => {
    try {
      if (admin) {
        const response = await editUser(admin.id, user?.token, data);
        if (response.error) {
          toast.error("Error al editar el administrador");
        } else if (response) {
          toast.success("Administrador editado exitosamente");
          getAdmines();
          onClose();
        }
      } else {
        const response = await postSingUp(data);
        if (response) {
          toast.success("Administrador creado exitosamente");
          getAdmines();
          reset();
          onClose();
        }
      }
    } catch (error) {
      if (admin) {
        toast.error("Error al editar el administrador");
        console.log("Error al editar el administrador", error);
      }
      toast.error("Error al crear administrador");
      console.log("Error al crear administrador", error);
    }
  };
  return (
    <>
      <button
        onClick={() => {
          editAdmin(admin);
        }}
        className={`${
          admin
            ? `text-blue-500  ${
                admin.inhabilitado === true
                  ? "text-gray-400 hover:text-blue-500 transition-all duration-300 ease-in-out"
                  : "text-blue-500"
              }`
            : "text-white font-poppins bg-black rounded-full px-4 py-3 scale-90 hover:scale-100 hover:text-black hover:bg-sky-400 transition-all duration-300 ease-in-out"
        }`}
      >
        {admin?.nombre ? iconEdit : "Agregar operador"}
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-black">
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-center text-white">
                {admin?.nombre ? "Editar operador" : "Agregar operador"}
              </h2>
            </ModalHeader>
            <ModalBody>
              {admin ? (
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
                  <RadioGroup
                    defaultValue="admin"
                    {...register("rol", { required: true })}
                  >
                    <Radio
                      {...register("rol", { required: true })}
                      value="admin"
                    >
                      <h2 className="text-white">
                        Rol: <span>Operador</span>
                      </h2>
                    </Radio>
                  </RadioGroup>
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
                    defaultValue="admin"
                    {...register("rol", { required: true })}
                  >
                    <Radio
                      {...register("rol", { required: true })}
                      value="admin"
                    >
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
