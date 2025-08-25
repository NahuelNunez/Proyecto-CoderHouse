import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
  RadioGroup,
  Radio,
} from "@heroui/react";

import { useForm } from "react-hook-form";
import { useProductos } from "./Store/useProductos";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useCategory } from "../Admin/Category/Store/useCategory";

export const AddProduct = ({ user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();

  const { postProductos, getProductos } = useProductos();
  const { getCategory, categories } = useCategory();

  const handleOnSubmit = async (data) => {
    try {
      if (!data.image[0]) {
        alert("Selecciona una imagen🙃");
        return;
      }
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("image", data.image[0]);
      await toast.promise(postProductos(formData, user.token), {
        pending: "Cargando...🙄",
        success: "Producto Agregado exitosamente😎",
        error: "Error al crear el producto😯",
      });
      getProductos();
    } catch (error) {
      console.log("Error al crear las promociones", error);
      toast.error("Error al crear las promociones");
    }
    onClose();
  };

  useEffect(() => {
    getProductos();
    getCategory();
  }, [user]);

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent text-blue-600">
        Agregar Productos
      </Button>
      <Modal
        className="bg-black"
        placement="top-center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-center text-white font-semibold">
                  Agregar Producto
                </h2>
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-10 items-start justify-center font-poppins "
                  onSubmit={handleSubmit(handleOnSubmit)}
                >
                  <input
                    type="file"
                    {...register("image")}
                    accept="image/*"
                    className="mt-4 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-white hover:file:bg-amber-600"
                  />
                  {errors.image && (
                    <p className="text-red-500">La imagen es requerida</p>
                  )}
                  <input
                    placeholder="Ingresar titulo"
                    className="outline-none w-full p-1 border-b-2 bg-transparent placeholder:text-sm  text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300 "
                    {...register("title", {
                      required: "El título es requerido",
                      pattern: {
                        value: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,-]{3,50}$/,
                        message:
                          "El título debe tener entre 3 y 50 caracteres válidos",
                      },
                    })}
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                  <RadioGroup
                    {...register("category")}
                    label="Selecciona la categoria"
                  >
                    {categories.map((categories) => (
                      <Radio
                        className={`${
                          categories.estado === "Inactivo" ? "hidden" : ""
                        }`}
                        key={categories.id}
                        {...register("category", { required: true })}
                        value={categories.category}
                      >
                        <h5 className="text-white">{categories.category}</h5>
                      </Radio>
                    ))}
                  </RadioGroup>

                  {errors.category && (
                    <p className="text-red-500">La categoria es requerida</p>
                  )}
                  <input
                    className="outline-none w-full border-b-2 p-1 bg-transparent placeholder:text-sm  text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300 "
                    {...register("price", {
                      required: "El precio es requerido",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "El precio debe ser un número válido",
                      },
                    })}
                    placeholder="Ingresar precio"
                  />
                  {errors.price && (
                    <p className="text-red-500">{errors.price.message}</p>
                  )}
                  <input
                    className="outline-none w-full border-b-2 p-1 bg-transparent placeholder:text-sm  text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300 "
                    {...register("stock", {
                      required: "El stock es requerido",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "El stock debe ser un número entero",
                      },
                    })}
                    placeholder="Ingresar Stock"
                  />
                  {errors.stock && (
                    <p className="text-red-500">{errors.stock.message}</p>
                  )}
                  <div className="flex items-center justify-around w-full">
                    <Button color="primary" type="submit">
                      Agregar
                    </Button>
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={() => {
                        onClose();
                      }}
                    >
                      Cerrar
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
