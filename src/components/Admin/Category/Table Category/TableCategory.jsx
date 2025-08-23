import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { useEffect } from "react";
import { useCategory } from "../Store/useCategory";
import { toast } from "react-toastify";

import { AddCategories } from "../AddCategories";

const openEye = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.4em"
    height="1.4em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
    />
  </svg>
);

const closeEye = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.4em"
    height="1.4em"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      d="M2.85 2.15a.5.5 0 0 0-.707.707l11 11a.5.5 0 0 0 .707-.707zM15 8.88c-.434.594-.885 1.12-1.35 1.59l-.707-.707q.644-.644 1.25-1.47a.5.5 0 0 0 .047-.511l-.045-.075c-1.75-2.4-3.72-3.62-5.93-3.7l-.256-.005a6 6 0 0 0-.787.048l-.862-.862a7.3 7.3 0 0 1 1.65-.187c2.66 0 5 1.39 6.99 4.12a1.5 1.5 0 0 1 0 1.77z"
    />
    <path
      fill="currentColor"
      d="M11 7.83A3.007 3.007 0 0 0 8.17 5zm-9.78-1q.551-.72 1.14-1.3l.707.707q-.644.644-1.25 1.47l-.047.079a.5.5 0 0 0 0 .432l.044.074c1.75 2.4 3.72 3.62 5.93 3.7l.256.005q.399 0 .787-.048l.861.86a7.3 7.3 0 0 1-1.65.188c-2.66 0-5-1.39-6.99-4.12l-.082-.125a1.5 1.5 0 0 1 .082-1.645l.215-.287z"
    />
    <path fill="currentColor" d="M7.83 11A3.007 3.007 0 0 1 5 8.17z" />
  </svg>
);

const iconDelete = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.4em"
    height="1.4em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M4 5h3V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1h3a1 1 0 0 1 0 2h-1v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7H4a1 1 0 1 1 0-2m3 2v13h10V7zm2-2h6V4H9zm0 4h2v9H9zm4 0h2v9h-2z"
    />
  </svg>
);

export const TableCategory = ({ user }) => {
  const {
    getCategory,
    categories,
    deleteCategory,
    inhabilitarCategory,
    habilitarCategory,
  } = useCategory();

  const functionDisabled = async (category) => {
    try {
      if (category.estado === true) {
        const response = await inhabilitarCategory(user.token, category.id);
        if (response) {
          toast.success("Estado de categoria Inactivo");
          getCategory();
        }
      } else if (category.estado === false) {
        const response = await habilitarCategory(user.token, category.id);
        if (response) {
          toast.success("Estado de categoria Activo");
          getCategory();
        }
      }
    } catch (error) {
      toast.error("Error al cambiar el estado de la categoria 🤔");
      console.log("Error al cambiar el estado de la categoria", error);
    }
  };

  const categoryDelete = async (idCategory) => {
    try {
      await toast.promise(deleteCategory(idCategory, user.token), {
        pending: "Eliminando...",
        success: "Categoria eliminada exitosamente 😎",
      });
      getCategory();
    } catch (error) {
      toast.error("Error al eliminar la categoria🤔");
      console.log("Error al eliminar la categoria", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="min-h-screen flex flex-col gap-20 justify-center items-center">
      <h2 className="text-[40px] uppercase font-playfair text-white">
        Categorias
      </h2>

      <Table className="w-auto bg-black/90 p-8">
        <TableHeader>
          <TableColumn className="">Categorias</TableColumn>
          <TableColumn className="">Estado</TableColumn>
          <TableColumn className="text-center">Accion</TableColumn>
        </TableHeader>
        <TableBody>
          {user?.rol === "admin" &&
            categories.map((category) => (
              <TableRow
                key={category.id}
                className={`${
                  category.estado === false ? "text-gray-400 " : ""
                }`}
              >
                <TableCell className="uppercase">{category.category}</TableCell>
                <TableCell>
                  {category.estado === true ? "Activo" : "Inactivo"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center ">
                    <button onClick={() => functionDisabled(category)}>
                      {category.estado === false ? closeEye : openEye}
                    </button>

                    <AddCategories
                      usuario={user}
                      category={category}
                      className={`${
                        category.estado === false
                          ? "text-gray-400 "
                          : "text-blue-500"
                      }`}
                    >
                      {" "}
                    </AddCategories>

                    <button
                      onClick={() => categoryDelete(category.id)}
                      className={`${
                        category.estado === false
                          ? "text-gray-400 "
                          : "text-[#bc134f]"
                      }`}
                    >
                      {iconDelete}
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          {user?.rol === "operador" &&
            categories.map((category) => (
              <TableRow
                key={category.id}
                className={`${
                  category.estado === false ? "text-gray-400 " : ""
                }`}
              >
                <TableCell>{category.category}</TableCell>
                <TableCell>
                  {category.estado === false ? "Inactivo" : "Activo"}
                </TableCell>
                <TableCell>
                  <button onClick={() => functionDisabled(category)}>
                    {category.estado === false ? closeEye : openEye}
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
