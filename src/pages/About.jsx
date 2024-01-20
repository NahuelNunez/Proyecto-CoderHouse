import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About | Chelitas Joyas";
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className=" text-center  m-9 flex flex-col gap-20">
        <h2 className="text-white font-semibold text-[40px]">Sobre Nosotros</h2>
        <div className="flex flex-row gap-8  items-center">
          <img
            src="/src/images/about.jpeg"
            className="h-[400px] w-[450px]  hover:scale-[1.1] transition duration-300 ease-in-out"
          />
          <p className="text-cyan-500 text-[30px] tracking-widest text-left font-sans ">
            Somos una boutique digital de joyas donde la elegancia se encuentra
            con la artesanía. Ofrecemos una colección cuidadosamente
            seleccionada de piezas únicas que combinan lo clásico y lo moderno,
            confeccionadas con los más altos estándares de calidad. En nuestra
            tienda, encontrarás joyas que destacan tu estilo y personalidad,
            cada una diseñada para crear momentos inolvidables. Nos
            comprometemos a brindarte una experiencia de compra en línea
            excepcional, donde la belleza, la calidad y la atención al detalle
            son nuestra prioridad. Únete a nosotros en este viaje por el mundo
            de las joyas, donde celebramos la singularidad y la emoción de cada
            pieza.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
