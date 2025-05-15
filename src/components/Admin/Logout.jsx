import { useState } from "react";
import { useAuth } from "./Store/useAuth";
import { Dropdown, DropdownMenu, DropdownItem } from "@heroui/react";
import { AddProduct } from "../Form as Admin/AddProduct";
import { useNavigate } from "react-router-dom";

export const Logout = ({ user }) => {
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
        className="text-white flex items-center gap-2 font-semibold absolute -right-40  cursor-pointer"
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
      {open && (
        <Dropdown className="absolute -right-60 -bottom-40  text-center  bg-black">
          <DropdownMenu className="">
            <DropdownItem className="text-white">
              Cambiar contraseña
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                LogOut();
              }}
              className="text-danger"
            >
              Cerrar Sesion
            </DropdownItem>
            {rol === "admin" && (
              <DropdownItem className="text-amber-400">
                <AddProduct user={user} />
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
};
