import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Input,
} from "@heroui/react";

import { useForm } from "react-hook-form";
import { useProductos } from "./Store/useProductos";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const AddProduct = ({ user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();

  const { postProductos, getProductos } = useProductos();

  const handleOnSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      if (data.image[0]) formData.append("image", data.image[0]);
      const response = await postProductos(formData, user.token);
      if (response) {
        toast.success("Producto creado exitosamente");
      }
      getProductos();
    } catch (error) {
      console.log("Error al crear las promociones", error);
      toast.error("Error al crear las promociones");
    }
    onClose();
  };

  useEffect(() => {
    getProductos();
  }, [user]);

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add products as Admin
      </Button>
      <Modal className="bg-black" isOpen={isOpen} onOpenChange={onOpenChange}>
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
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
                    <p className="text-red-500">El titulo es requerido</p>
                  )}
                  <input
                    className="outline-none w-full border-b-2 p-1 bg-transparent placeholder:text-sm  text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300 "
                    {...register("category", { required: true })}
                    placeholder="Ingresar categoria"
                  />
                  {errors.category && (
                    <p className="text-red-500">La categoria es requerida</p>
                  )}
                  <input
                    className="outline-none w-full border-b-2 p-1 bg-transparent placeholder:text-sm  text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300 "
                    {...register("price", { required: true })}
                    placeholder="Ingresar precio"
                  />
                  {errors.price && (
                    <p className="text-red-500">El precio es requerido</p>
                  )}
                  <input
                    className="outline-none w-full border-b-2 p-1 bg-transparent placeholder:text-sm  text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300 "
                    {...register("stock", { required: true })}
                    placeholder="Ingresar Stock"
                  />
                  {errors.stock && (
                    <p className="text-red-500">El stock es requerido</p>
                  )}
                  <div className="flex items-center justify-around w-full">
                    <Button color="primary" type="submit" onPress={onClose}>
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
