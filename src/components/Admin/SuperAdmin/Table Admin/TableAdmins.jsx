import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";

import { useUser } from "../../../User/Store/useUser";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuth } from "../../Store/useAuth";
import { AddAdmin } from "../AddAdmin";
import { useLogs } from "../../../../hooks/useLogs";

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

const openEye = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.2em"
    height="1.2em"
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
    width="1.2em"
    height="1.2em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"
    />
  </svg>
);
export const TableAdmins = () => {
  const { getAllLogs } = useLogs();
  const { getUser, deleteUser, inhabilitarAdmin, habilitarAdmin } = useUser();
  const { user } = useAuth();
  const [admines, setAdmines] = useState([]);

  const [logs, setLogs] = useState([]);

  const getLogs = async () => {
    try {
      const { data: response, error: ErrorLogs } = await getAllLogs(user.token);
      if (response) {
        setLogs(response.data.logs);
      } else if (ErrorLogs) {
        console.error("Error al obtener los logs", ErrorLogs);
      }
    } catch (error) {
      console.log("Error al obtener los logs", error);
    }
  };

  console.log("Activity Logs", logs);

  const getAdmines = async () => {
    try {
      const response = await getUser();
      if (response) {
        setAdmines(response.data);
      }
    } catch (error) {
      console.log("Error al traer los admines", error);
    }
  };

  useEffect(() => {
    getAdmines();
    getLogs();
  }, []);

  const filtroAdmines = admines.filter((admin) => admin.rol === "admin");

  const filtroOperadores = admines.filter(
    (operador) => operador.rol === "operador"
  );

  const deleteAdmin = async (idAdmin) => {
    try {
      const response = await deleteUser(idAdmin, user.token);
      if (response) {
        toast.success("Operador eliminado exitosamente");
        getAdmines();
      } else if (response.error) {
        toast.error("Error al eliminar el administrador");
      }
    } catch (error) {
      console.log("Error al eliminar el administrador", error);
    }
  };

  const disableAdmin = async (id, admin, operador) => {
    try {
      if (admin?.inhabilitado === false || operador?.inhabilitado === false) {
        const response = await inhabilitarAdmin(id, user.token);
        if (response.error) {
          toast.error("Error al inhabilitar el Operador");
        } else if (response) {
          toast.success(
            `${
              admin.rol === "admin"
                ? "Administrador Inhabilitado exitosamente"
                : "Operador Inhabilitado exitosamente"
            }`
          );
          getAdmines();
        }
      } else if (
        admin?.inhabilitado === true ||
        operador?.inhabilitado === true
      ) {
        const response = await habilitarAdmin(id, user.token);
        if (response.error) {
          toast.error("Error al habilitar el Operador");
        } else if (response) {
          toast.success(
            `${
              admin.rol === "admin"
                ? "Administrador habilitado exitosamente"
                : "Operador habilitado exitosamente"
            }`
          );
          getAdmines();
        }
      }
    } catch (error) {
      console.log("Error al inhabilitar el Operador", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center gap-5 items-center">
      <h2 className="text-white font-playfair text-[40px] mt-14">
        Tabla Administradores y operadores
      </h2>
      <div className="flex items-center gap-10  justify-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          <h2 className="font-poppins text-white text-center">
            Administradores
          </h2>
          <Table className="w-auto bg-black/90 p-8">
            <TableHeader>
              <TableColumn>Full Name</TableColumn>

              <TableColumn>Accion</TableColumn>
            </TableHeader>
            <TableBody>
              {filtroAdmines.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>
                    <div
                      className={`flex flex-col ${
                        admin.inhabilitado === true ? "text-gray-400" : ""
                      } `}
                    >
                      <h2>
                        {admin.nombre} {admin.apellido}
                      </h2>
                      <h2
                        className={` text-[12px] ${
                          admin.inhabilitado === true
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {admin.email}
                      </h2>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        className={`${
                          admin.inhabilitado === true
                            ? "text-gray-400 hover:text-gray-500 transition-all duration-300 ease-in-out"
                            : "text-gray-500"
                        }`}
                        onClick={() => disableAdmin(admin.id, admin)}
                      >
                        {admin.inhabilitado ? openEye : closeEye}
                      </button>

                      <AddAdmin
                        user={user}
                        iconEdit={iconEdit}
                        getAdmines={getAdmines}
                        admin={admin}
                      />

                      <button
                        className={`${
                          admin.inhabilitado === true
                            ? "text-gray-400 hover:text-[#bc134f] transition-all duration-300 ease-in-out"
                            : "text-[#bc134f]"
                        }`}
                        onClick={() => deleteAdmin(admin.id)}
                      >
                        {iconDelete}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* OPERADORES */}
        <div className="flex flex-col gap-2 items-center justify-center">
          <h2 className="text-white font-poppins text-center">Operadores</h2>
          <Table className="w-auto bg-black/90 p-8">
            <TableHeader>
              <TableColumn>Full Name</TableColumn>

              <TableColumn>Accion</TableColumn>
            </TableHeader>
            <TableBody>
              {filtroOperadores.map((operador) => (
                <TableRow key={operador.id}>
                  <TableCell>
                    <div
                      className={`flex flex-col ${
                        operador.inhabilitado === true ? "text-gray-400" : ""
                      } `}
                    >
                      <h2>
                        {operador.nombre} {operador.apellido}
                      </h2>
                      <h2
                        className={` text-[12px] ${
                          operador.inhabilitado === true
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {operador.email}
                      </h2>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        className={`${
                          operador.inhabilitado === true
                            ? "text-gray-400 hover:text-gray-500 transition-all duration-300 ease-in-out"
                            : "text-gray-500"
                        }`}
                        onClick={() => disableAdmin(operador.id, operador)}
                      >
                        {operador.inhabilitado ? openEye : closeEye}
                      </button>

                      <AddAdmin
                        user={user}
                        iconEdit={iconEdit}
                        getAdmines={getAdmines}
                        operador={operador}
                      />

                      <button
                        className={`${
                          operador.inhabilitado === true
                            ? "text-gray-400 hover:text-[#bc134f] transition-all duration-300 ease-in-out"
                            : "text-[#bc134f]"
                        }`}
                        onClick={() => deleteAdmin(operador.id)}
                      >
                        {iconDelete}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddAdmin
        getAdmines={getAdmines}
        user={user}
        closeEye={closeEye}
        openEye={openEye}
      />
      <h2 className="font-playfair text-[30px] text-white">
        Actividad Administradores / Operadores
      </h2>

      <div className="bg-black/90 flex flex-col-reverse gap-2 p-8 mb-14 w-auto h-[30em] overflow-auto scrollbar-thin scrollbar-track">
        {logs.map((log) => (
          <div key={log.id} className=" text-white gap-6   border-b-1 p-2 m-0 ">
            <h2
              className={`${
                log.action === "CREATE_PRODUCT" ||
                log.action === "CREATE_CATEGORY"
                  ? "text-amber-400"
                  : "" ||
                    log.action === "UPDATE_PRODUCT" ||
                    log.action === "UPDATE_CATEGORY"
                  ? "text-blue-500"
                  : "text-red-500"
              }`}
            >
              {log.action}
            </h2>
            <p className="text-gray-300">{log.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
