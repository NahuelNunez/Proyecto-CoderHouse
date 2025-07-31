import { useForm } from "react-hook-form";
import { RadioGroup, Radio } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

import { toast } from "react-toastify";
import { useProductos } from "../Form as Admin/Store/useProductos";
import { useCategory } from "../Admin/Category/Store/useCategory.js";
import { useEffect } from "react";
export const Editlist = ({ producto, user }) => {
  const { editProductos, getProductos } = useProductos();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { categories, getCategory } = useCategory();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getCategory();
  }, []);

  const Onediting = (producto) => {
    if (producto) {
      console.log("setValue", producto);
      setValue("image", producto.image[0]);
      setValue("title", producto.title);
      setValue("category", producto.category);
      setValue("price", producto.price);
      setValue("stock", producto.stock);
    }

    onOpen();
  };

  const OnSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("stock", data.stock);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await toast.promise(editProductos(producto.id, formData, user.token), {
        pending: "Editando...🙄",
        success: "Producto editado exitosamente😎",
        error: "Error al editar el producto😯",
      });
      getProductos();
      console.log("After setvalie", formData);
    } catch (error) {
      console.log("Error al editar el producto", error);
    }
  };
  return (
    <>
      <Button
        className="bg-transparent hover:text-blue-500 text-white p-0 w-1 m-0"
        onPress={() => Onediting(producto)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.4em"
          height="1.4em"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
            <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
          </g>
        </svg>
      </Button>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        className="bg-black"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-white font-semibold text-center">
                  Editar Producto
                </h2>
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(OnSubmit)}
                  className="flex flex-col items-start gap-5"
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
                  <RadioGroup
                    {...register("category")}
                    label="Selecciona la categoria"
                  >
                    {categories.map((category) => (
                      <Radio
                        key={category.id}
                        {...register("category")}
                        value={category.category}
                      >
                        <h5 className="text-white">{category.category}</h5>
                      </Radio>
                    ))}
                  </RadioGroup>
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

                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit" onPress={onClose}>
                      Editar
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
