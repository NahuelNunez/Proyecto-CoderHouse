import { useState } from "react";
import { useAuth } from "./Store/useAuth";
import { Dropdown, DropdownMenu, DropdownItem } from "@heroui/react";
import { AddProduct } from "../Form as Admin/AddProduct";
import { useNavigate } from "react-router-dom";

import { AddCategories } from "./Category/AddCategories";

export const Logout = ({ user, toggleMenu }) => {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { name, rol } = user;
  const { logout } = useAuth();

  const openToggle = () => {
    setOpen(!open);
  };

  const LogOut = () => {
    logout();
    Navigate("/login");
  };
  return (
    <div className="relative flex flex-col   items-center">
      <button
        onClick={openToggle}
        className="text-white flex items-center gap-2 font-semibold absolute lg:-right-40  cursor-pointer"
      >
        {name}{" "}
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

      {!open && rol === "usuario" && (
        <Dropdown className="-bottom-[120px] z-[9999] absolute -right-28 lg:-right-60 lg:-bottom-[119px]  lg:text-center bg-black">
          <DropdownMenu className="">
            <DropdownItem
              variant="bordered"
              className="text-white"
              onPress={() => {
                Navigate(`/changepassword`), openToggle(), toggleMenu();
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
        </Dropdown>
      )}
      {open === true && rol === "admin" && (
        <Dropdown className="absolute lg:-right-60  -right-[100px] -bottom-[300px] text-center  bg-black">
          <DropdownMenu className="">
            <DropdownItem
              variant="bordered"
              className="text-white"
              onPress={() => {
                Navigate(`/changepassword`), openToggle(), toggleMenu();
              }}
            >
              <span>Cambiar contraseña</span>
            </DropdownItem>

            {open === true && rol === "admin" && (
              <DropdownItem
                variant="bordered"
                onPress={() => {
                  openToggle(), toggleMenu();
                }}
                className="text-amber-400"
              >
                <AddProduct user={user} />
              </DropdownItem>
            )}
            {rol === "admin" && (
              <DropdownItem
                variant="bordered"
                onPress={() => {
                  Navigate(`/admin/TableOrders`), openToggle(), toggleMenu();
                }}
              >
                <span className="text-green-500">Table Orders</span>
              </DropdownItem>
            )}
            {rol === "admin" && (
              <DropdownItem
                variant="bordered"
                onPress={() => {
                  openToggle(), toggleMenu();
                }}
              >
                <AddCategories user={user} />
              </DropdownItem>
            )}
            {rol === "admin" && (
              <DropdownItem
                variant="bordered"
                onPress={() => {
                  Navigate(`/admin/categories`);
                  openToggle(), toggleMenu();
                }}
              >
                <span className="text-amber-300">Table Categories</span>
              </DropdownItem>
            )}
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
        </Dropdown>
      )}
      {open === true && rol === "superadmin" && (
        <Dropdown className="absolute lg:-right-60  -right-[100px] -bottom-[155px] text-center  bg-black">
          <DropdownMenu>
            <DropdownItem
              variant="bordered"
              className="text-white"
              onPress={() => {
                Navigate(`/changepassword`), openToggle(), toggleMenu();
              }}
            >
              <span>Cambiar contraseña</span>
            </DropdownItem>
            <DropdownItem
              variant="bordered"
              onPress={() => {
                Navigate(`/superadmin/TableAdmins`), openToggle(), toggleMenu();
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
        </Dropdown>
      )}
    </div>
  );
};
