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

import { useForm, Controller } from "react-hook-form";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { useCategory } from "./Store/useCategory";

const iconEdit = (
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
);

export const AddCategories = ({ user, category, usuario }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { postCategory, editCategory, getCategory } = useCategory();
  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();

  const editingCategories = (category) => {
    if (category) {
      setValue("category", category.category);
      setValue("estado", category.estado);
    }

    onOpen();
  };

  const handleOnSubmit = async (data) => {
    try {
      if (category?.id) {
        const { data: response, error: EditCategory } = await editCategory(
          usuario.token,
          category.id,
          data
        );
        if (response) {
          toast.success("Categoria editada exitosamente");
          getCategory();
          onClose();
        } else if (EditCategory) {
          toast.error(EditCategory);
          console.error("Error al editar las categorias", EditCategory);
        }
      } else {
        const { data: response, error: ErrorCategory } = await postCategory(
          user.token,
          data
        );
        if (response) {
          toast.success("Categoria creada exitosamente");
          getCategory();
          reset();
          onClose();
        } else if (ErrorCategory) {
          toast.error(ErrorCategory);
          console.error("Error al crear la categoria", ErrorCategory);
        }
      }
    } catch (error) {
      toast.error("Error al crear la categoria 😮");
      console.log("Error al crear la categoria", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, [user]);

  return (
    <>
      <Button
        onPress={() => {
          onOpen, editingCategories(category);
        }}
        className={`bg-transparent ${
          category?.category ? "text-blue-500" : "text-amber-500"
        }`}
      >
        {category?.category ? iconEdit : `Agregar categorias`}
      </Button>
      <Modal
        className="bg-black"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-center text-white font-semibold">
                  {category?.category
                    ? "Editar categoria "
                    : "Agregar categorias"}
                </h2>
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-10 items-start justify-center font-poppins w-full "
                  onSubmit={handleSubmit(handleOnSubmit)}
                >
                  <input
                    placeholder="Ingresar categoria"
                    className="outline-none w-full p-1 border-b-2 bg-transparent placeholder:text-sm  text-sky-500 focus:border-b-gray-600 focus:transition-all focus:duration-300 "
                    {...register("category", { required: true })}
                  />
                  {errors.category && (
                    <p className="text-red-500">la categoria es requerida</p>
                  )}
                  <Controller
                    name="estado"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <RadioGroup
                        orientation="horizontal"
                        value={value ? "true" : "false"}
                        onBlur={onBlur}
                        onValueChange={(v) => onChange(v === "true")}
                      >
                        <Radio value="true">
                          <h5 className="text-white">Activo</h5>
                        </Radio>
                        <Radio value="false">
                          <h5 className="text-white">Inactivo</h5>
                        </Radio>
                      </RadioGroup>
                    )}
                  />

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
