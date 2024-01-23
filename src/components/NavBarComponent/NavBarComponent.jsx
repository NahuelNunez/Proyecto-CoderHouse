import { useState } from "react";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";

const NavBarComponent = () => {
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

  return (
    <div className="flex items-center w-full px-4 justify-around bg-slate-800 py-4">
      <Link to="/" className="text-sky-500 font-semibold text-x1 p-2">
        Chelitas Joyas
      </Link>
      <div className="relative">
        <div
          className="flex items-center justify-between w-full border border-sky-500 hover:text-white transition duration-0.5 hover:bg-slate-900  px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-cyan-500 hover:text-white">
            Seleccionar categoria
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${isOpen ? "transform rotate-180" : ""}`}
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
          <ul className="absolute z-10 w-full mt-2 bg-slate-900 border border-gray-400  rounded-lg">
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
      <Link
        to="/productos"
        className="text-cyan-500 font-semibold text-x1 p-2 border border-sky-500 rounded-lg hover:text-white transition duration-0.5 hover:bg-slate-900"
      >
        Productos
      </Link>
      <Link
        to="/about"
        className="text-cyan-500 font-semibold text-x1 p-2 border border-sky-500 rounded-lg hover:text-white transition duration-0.5 hover:bg-slate-900"
      >
        About
      </Link>
      <Link
        to="/contact"
        className="text-cyan-500   font-semibold text-x1 p-2 border border-sky-500 rounded-lg hover:text-white transition duration-0.5 hover:bg-slate-900 "
      >
        Contact
      </Link>

      <CartWidget />
    </div>
  );
};

export default NavBarComponent;
