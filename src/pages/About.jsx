import { useEffect } from "react";

const circleCheck = (
  <svg
    className="group-hover:scale-125 transition-all group-hover:text-sky-500 ease-in-out duration-500"
    xmlns="http://www.w3.org/2000/svg"
    width="2em"
    height="2em"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
      <path d="m9 12l2 2l4-4" />
    </g>
  </svg>
);

const diamond = (
  <svg
    className="group-hover:scale-125 transition-all group-hover:text-sky-500 ease-in-out duration-500"
    xmlns="http://www.w3.org/2000/svg"
    width="2em"
    height="2em"
    viewBox="0 0 1024 896"
  >
    <path
      fill="currentColor"
      d="m896 0l128 256H768zM576 0h256L704 256zM384 256L512 0l128 256zM192 0h256L320 256zM0 256L128 0l128 256zm448 640L0 320h256zm256-576L512 896L320 320zm320 0L576 896l192-576z"
    />
  </svg>
);

const leaf = (
  <svg
    className="group-hover:scale-125 transition-all group-hover:text-sky-500 ease-in-out duration-500"
    xmlns="http://www.w3.org/2000/svg"
    width="2em"
    height="2em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m20.84 22.73l-5.7-5.7C13.26 18.79 10.92 20 8 20c-.36 0-.86-.13-1.34-.3L5.71 22l-1.89-.66c1.33-3.31 2.68-7.02 5.84-9.79l-.89-.89c-2.01 1.37-3.91 3.44-5.02 6.59c0 0-1.75-1.75-1.75-3.75C2 12 3.12 9.32 5.72 7.61L1.11 3l1.28-1.27l14 14.01l5.72 5.72zM17 8c-1.65.37-3.07.88-4.3 1.5l4.8 4.79C20.87 9.35 22 3 22 3c-.97 1.95-7.65 2.24-12.62 3.18l2.77 2.77C14.81 8 17 8 17 8"
    />
  </svg>
);

const About = () => {
  useEffect(() => {
    document.title = "About | Chelitas Joyas";
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-20 items-center justify-center">
      <div className="flex gap-20 about justify-center w-full mt-20">
        <div className="w-[450px] flex flex-col gap-8">
          <h2 className="text-white text-[40px] font-playfair">
            Elegancia que Perdura
          </h2>
          <p className="text-gray-300  text-sm/7 font-poppins">
            En Chelita Joyas creemos que cada joya cuenta una historia. Por eso,
            nuestras piezas de plata 925 están diseñadas para acompañarte en
            cada momento especial, combinando belleza, autenticidad y estilo
            atemporal.
          </p>
          <p className="text-gray-300 text-sm/7 font-poppins">
            Cada creación está elaborada con amor y dedicación, utilizando plata
            de ley y detalles cuidadosamente seleccionados que garantizan
            durabilidad y un brillo natural que no se apaga con el tiempo.
          </p>
          <p className="text-gray-300  text-sm/7 font-poppins">
            En Chelita Joyas no solo llevás una joya, llevás un pedacito de arte
            hecho con el corazón.
          </p>
        </div>
        <div className="about-line overflow-hidden transition-all duration-300 ease-in-out ">
          <img
            src="/src/images/about2.jpg"
            className="w-[400px]  h-[550px]  object-fill scale-100 hover:scale-110 transition-all ease-in-out duration-300 "
          />
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,_1fr))]  gap-32 max-w-[1200px] text-white">
        <div className="mx-auto max-w-[300px] w-full group text-center hover:bg-black/90 p-4 hover:translate-y-[-20px] ease-in-out transition-all duration-500 flex flex-col gap-2 border-t-3 border-sky-500  ">
          <div className="flex justify-center items-center gap-2 mt-5">
            {circleCheck}
            <h2 className="font-playfair text-[19px]">Plata 925 Certificada</h2>
          </div>
          <hr className="mx-auto w-[25px] group-hover:w-[45px] group-hover:border-sky-500 group-hover:scale-110 ease-in-out transition-all duration-300"></hr>
          <p className="font-poppins text-sm">
            Plata de ley ideal para uso diario, mantiene su brillo y calidad.
          </p>
        </div>
        <div className="text-center border-t-3 max-w-[300px]  w-full group hover:bg-black/90 p-4 hover:translate-y-[-20px] ease-in-out transition-all duration-500 flex flex-col gap-2 border-sky-500 ">
          <div className="flex justify-center items-center gap-2 mt-5">
            {leaf}
            <h2 className="font-playfair text-[19px] ">Hipoalergénicas</h2>
          </div>
          <hr className="mx-auto w-[25px] group-hover:w-[45px] group-hover:border-sky-500 group-hover:scale-110 ease-in-out transition-all duration-300"></hr>
          <p className="font-poppins text-sm">
            Aptas para pieles sensibles, sin níquel ni metales irritantes.
          </p>
        </div>
        <div className="text-center flex flex-col group max-w-[300px]  w-full hover:bg-black/90 p-4 hover:translate-y-[-20px] ease-in-out transition-all duration-500 gap-2 border-t-3 border-sky-500 ">
          <div className="flex justify-center text-center items-center gap-2 mt-5">
            {diamond}
            <h2 className="font-playfair text-[19px]">Detalles Exclusivos</h2>
          </div>
          <hr className="mx-auto w-[25px] group-hover:w-[45px] group-hover:border-sky-500  group-hover:scale-110 ease-in-out transition-all duration-300"></hr>
          <p className="font-poppins text-sm">
            Diseños únicos que realzan tu estilo y personalidad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
