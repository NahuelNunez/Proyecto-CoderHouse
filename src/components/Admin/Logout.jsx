import { useAuth } from "./Store/useAuth";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@heroui/react";
import { AddProduct } from "../Form as Admin/AddProduct";
import { useNavigate } from "react-router-dom";

import { AddCategories } from "./Category/AddCategories";

export const Logout = ({ user, toggleMenu }) => {
  const Navigate = useNavigate();

  const { name, rol } = user;
  const { logout } = useAuth();

  const LogOut = () => {
    logout();
    Navigate("/login");
  };
  return (
    <Dropdown className="relative flex flex-col bg-black  items-center">
      <DropdownTrigger>
        <button className="text-white flex items-center gap-2 font-semibold  cursor-pointer">
          {name}
          <svg
            className="animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569z"
            />
          </svg>
        </button>
      </DropdownTrigger>

      {rol === "usuario" && (
        <DropdownMenu className="text-center bg-black">
          <DropdownItem
            variant="bordered"
            className="text-white"
            onPress={() => {
              Navigate(`/changepassword`), toggleMenu();
            }}
          >
            <span>Cambiar contraseña</span>
          </DropdownItem>
          <DropdownItem
            variant="bordered"
            onPress={() => {
              LogOut();
              toggleMenu();
            }}
            className="text-danger"
          >
            Cerrar Sesion
          </DropdownItem>
        </DropdownMenu>
      )}
      {rol === "admin" && (
        <DropdownMenu closeOnSelect={false} className="text-center bg-black">
          <DropdownItem
            variant="bordered"
            closeOnSelect={true}
            className="text-white"
            onPress={() => {
              Navigate(`/changepassword`), toggleMenu();
            }}
          >
            <span>Cambiar contraseña</span>
          </DropdownItem>

          <DropdownItem
            variant="bordered"
            closeOnSelect={false}
            onPress={() => {
              toggleMenu();
            }}
            className="text-amber-400"
          >
            <AddProduct user={user} />
          </DropdownItem>

          <DropdownItem
            closeOnSelect={true}
            variant="bordered"
            onPress={() => {
              Navigate(`/admin/TableOrders`), toggleMenu();
            }}
          >
            <span className="text-green-500">Tabla Ordenes</span>
          </DropdownItem>

          <DropdownItem
            variant="bordered"
            closeOnSelect={false}
            onPress={() => {
              toggleMenu();
            }}
          >
            <AddCategories user={user} />
          </DropdownItem>

          <DropdownItem
            closeOnSelect={true}
            variant="bordered"
            onPress={() => {
              Navigate(`/admin/categories`);
              toggleMenu();
            }}
          >
            <span className="text-amber-300">Tabla Categorias</span>
          </DropdownItem>

          <DropdownItem
            variant="bordered"
            closeOnSelect={true}
            onPress={() => {
              LogOut();
              toggleMenu();
            }}
            className="text-danger"
          >
            Cerrar Sesion
          </DropdownItem>
        </DropdownMenu>
      )}
      {rol === "superadmin" && (
        <DropdownMenu className="    text-center  bg-black">
          <DropdownItem
            closeOnSelect
            variant="bordered"
            className="text-white"
            onPress={() => {
              Navigate(`/changepassword`), toggleMenu();
            }}
          >
            <span>Cambiar contraseña</span>
          </DropdownItem>

          <DropdownItem
            variant="bordered"
            onPress={() => {
              Navigate(`/superadmin/TableAdmins`), toggleMenu();
            }}
          >
            <span className="text-red-600">Table Admins</span>
          </DropdownItem>
          <DropdownItem
            variant="bordered"
            onPress={() => {
              LogOut();
              toggleMenu();
            }}
            className="text-danger"
          >
            Cerrar Sesion
          </DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  );
};
