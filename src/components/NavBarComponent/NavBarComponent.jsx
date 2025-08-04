import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { useAuth } from "../Admin/Store/useAuth";
import { Logout } from "../Admin/Logout";
import { Carrito } from "../Carrito/Carrito";
import { useCategory } from "../Admin/Category/Store/useCategory";

const NavBarComponent = () => {
  const { categories, getCategory } = useCategory();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="flex  items-center w-full px-4 fixed top-0 justify-between lg:justify-around  py-2 bg-black/90  z-[10]">
      <Link
        to="/"
        className="text-sky-500 font-semibold font-playfair  text-lg  sm:text-[17pxs] md:text-[19px]"
      >
        Chelitas Joyas
      </Link>
      {/* RESPONSIVE x640 x768 x1024 */}

      <div className="lg:hidden ">
        <button
          className="lg:hidden flex flex-col gap-1.5 items-center p-2 transition-all"
          onClick={toggleMenu}
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-[0.5s] ${
              open
                ? "rotate-[230deg] translate-y-2 duration-[0.5s] "
                : "bg-white"
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-[0.5s] ${
              open
                ? "-rotate-[230deg] translate-y-0 duration-[0.5s] "
                : "bg-white"
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all ${
              open ? "opacity-0" : "opacity-100"
            }`}
          ></span>
        </button>

        <div
          className={`h-full z-[9999] fixed bg-black/80 w-full left-0 top-[50px] transition-all duration-300 ${
            open ? "mobileNavbar" : "mobileNavbarExit"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-5">
            <Dropdown className="bg-black">
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className=" text-white text-center p-2 "
                >
                  Categorias
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="bordered" categories={categories}>
                {categories.map((option) => (
                  <DropdownItem
                    className={`${
                      option.estado === "Inactivo" ? "hidden" : ""
                    }`}
                    key={option.id}
                    textValue={option.category}
                    onPress={() => {
                      navigate(`/category/${option.category}`), toggleMenu();
                    }}
                  >
                    <span className="text-white font-semibold">
                      {option.category}
                    </span>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button onPress={toggleMenu} variant="bordered" className=" p-2">
              <Link to="/Productos" className="text-white">
                Productos
              </Link>
            </Button>
            <Button onPress={toggleMenu} variant="bordered" className=" p-2 ">
              <Link to="/about" className="text-white font-semibold">
                Nosotros
              </Link>
            </Button>
            <Button onPress={toggleMenu} variant="bordered" className=" p-2">
              <Link to="/contact" className="text-white font-semibold">
                Contacto
              </Link>
            </Button>

            <Carrito toggleMenu={toggleMenu} />

            {user ? (
              <Logout user={user} toggleMenu={toggleMenu} />
            ) : (
              <Link onClick={toggleMenu} to="/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M17 18h4v-2h-4v-2l-3 3l3 3zM11 4C8.8 4 7 5.8 7 8s1.8 4 4 4s4-1.8 4-4s-1.8-4-4-4m0 10c-4.4 0-8 1.8-8 4v2h9.5c-.3-.8-.5-1.6-.5-2.5c0-1.2.3-2.3.9-3.4c-.6 0-1.2-.1-1.9-.1"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* LARGE RESPONSIVE */}

      <div className="hidden lg:flex lg:relative lg:gap-10 lg:items-center">
        <div className="relative">
          <div className="">
            <Dropdown className="bg-black">
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className=" text-white text-center p-2 "
                >
                  Categorias
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="bordered" categories={categories}>
                {categories.map((option) => (
                  <DropdownItem
                    className={`${
                      option.estado === "Inactivo" ? "hidden" : ""
                    }`}
                    key={option.id}
                    textValue={option.category}
                    onPress={() => navigate(`/category/${option.category}`)}
                  >
                    <span className="text-white font-semibold">
                      {option.category}
                    </span>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <Button variant="bordered" className=" p-2">
          <Link to="/Productos" className="text-white">
            Productos
          </Link>
        </Button>
        <Button variant="bordered" className=" p-2 ">
          <Link to="/about" className="text-white font-semibold">
            Nosotros
          </Link>
        </Button>
        <Button variant="bordered" className=" p-2">
          <Link to="/contact" className="text-white font-semibold">
            Contacto
          </Link>
        </Button>
        {/* <CartWidget /> */}
        <Carrito />
        {user ? (
          <Logout user={user} />
        ) : (
          <Link to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M17 18h4v-2h-4v-2l-3 3l3 3zM11 4C8.8 4 7 5.8 7 8s1.8 4 4 4s4-1.8 4-4s-1.8-4-4-4m0 10c-4.4 0-8 1.8-8 4v2h9.5c-.3-.8-.5-1.6-.5-2.5c0-1.2.3-2.3.9-3.4c-.6 0-1.2-.1-1.9-.1"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBarComponent;
