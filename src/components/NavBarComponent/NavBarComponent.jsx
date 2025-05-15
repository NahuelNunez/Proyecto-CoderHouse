import { useState } from "react";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { useAuth } from "../Admin/Store/useAuth";
import { Logout } from "../Admin/Logout";

const NavBarComponent = () => {
  const { user } = useAuth();
  const options = [
    {
      id: 1,
      name: "tobilleras",
    },
    {
      id: 2,
      name: "collares",
    },
    {
      id: 3,
      name: "aros",
    },
    {
      id: 4,
      name: "abridores",
    },
    {
      id: 5,
      name: "brazalete",
    },
  ];

  const handleOptionClick = () => {
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex  items-center w-full px-4 fixed top-0 justify-around  py-2 bg-black/90  z-[9999]">
      <Link
        to="/"
        className="text-sky-500 font-semibold font-playfair  text-lg  sm:text-[17pxs] md:text-[19px]"
      >
        Chelitas Joyas
      </Link>
      {/* RESPONSIVE x640 x768 x1024 */}
      <div className="block  lg:hidden">
        <button onClick={() => setOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path fill="none" stroke="#ffff" d="M3 17h18M3 12h18M3 7h18" />
          </svg>
        </button>

        <div
          className={`${
            !open && "hidden"
          } bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`}
          onClick={() => setOpen(!open)}
        ></div>
        <div
          className={`${
            open ? "w-[160px]" : "w-0"
          } bg-slate-900 min-h-screesn  fixed top-0 left-0 right-0 flex`}
        >
          <div
            className={`${
              !open && "hidden"
            }  pt-2 flex flex-col items-center justify-between mb-2 ml-2`}
          >
            <button onClick={() => setOpen(!open)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffffff"
                  d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
                />
              </svg>
            </button>

            <div className="">
              <div
                className="sm:ml-5 flex items-center justify-between sm:p-2 sm:w-[114px] h-[38px] border border-sky-500 hover:text-white transition duration-0.5 hover:bg-slate-900  px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="text-cyan-500 sm:text-sm font-semibold hover:text-white p-0">
                  Seleccionar categoria
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`sm:h-6 w-6 ${
                    isOpen ? "transform rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v10a1 1 0 11-2 0V4a1 1 0 011-1zM5.293 8.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {isOpen && (
                <ul className="absolute z-10 w-full mt-2 bg-slate-900 border border-gray-400  rounded-lg left-0">
                  {options.map((option) => (
                    <Link key={option.id} to={`/category/${option.name}`}>
                      <li
                        className="px-4 py-2 text-cyan-500 hover:text-white transition duration-0.5 cursor-pointer hover:border-spacing-1 border-sky-500 rounded-lg "
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <Link
                to="/productos"
                className="text-cyan-500 font-semibold p-2 sm:text-sm sm:w-[80px] sm:h-[40px]  border border-sky-500 rounded-lg hover:text-white transition duration-0.5 hover:bg-slate-900"
              >
                Productos
              </Link>
            </div>
            <div>
              <Link
                to="/about"
                className="text-cyan-500 font-semibold p-2 border sm:text-sm  sm:w-[80px] sm:h-[40px] border-sky-500 rounded-lg hover:text-white transition duration-0.5 hover:bg-slate-900"
              >
                About
              </Link>
            </div>
            <div>
              <Link
                to="/contact"
                className="text-cyan-500   font-semibold p-2  border sm:text-sm sm:w-[80px] sm:h-[40px] border-sky-500 rounded-lg hover:text-white transition duration-0.5 hover:bg-slate-900 "
              >
                Contact
              </Link>
            </div>
            <div>
              <CartWidget />
            </div>
          </div>
        </div>

        {/* LARGE RESPONSIVE */}
      </div>

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
              <DropdownMenu className="" variant="bordered">
                {options.map((option) => (
                  <DropdownItem key={option.id} className="">
                    <Link
                      className="text-white font-bold"
                      key={option.id}
                      to={`/category/${option.name}`}
                    >
                      {option.name}
                    </Link>
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
        <Button variant="bordered" to="/contact" className=" p-2">
          <Link to="/contact" className="text-white font-semibold">
            Contacto
          </Link>
        </Button>
        <CartWidget />
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
