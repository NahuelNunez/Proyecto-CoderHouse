const Welcome = () => {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <h1 className="uppercase font-playfair  text-[40px] text-center py-4 text-white  sm:mt-[50px]">
        Cuidado de joya
      </h1>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]  lg:grid-cols-[repeat(3,_minmax(200px,_1fr))] place-items-center place-content-center  gap-5">
        <div className=" flex flex-col  max-w-md    bg-black/90 rounded-xl scale-90 transition-all hover:scale-100 duration-300 ">
          <img
            src="/src/images/primer paso.jpg"
            className="w-[450px] h-[250px] object-cover object-center rounded-xl"
          />
          <div className="flex items-center gap-2 px-2 text-white mt-1">
            <span className=" px-2  rounded-full border border-white">1</span>
            <h2 className="font-oswald text-xl">Presentación del producto</h2>
          </div>
          <p className="text-white font-poppins md:w-[400px] px-10 ">
            Mostramos el frasco de Catalim, el líquido limpiador que usaremos
            para dejar nuestras joyas relucientes.
          </p>
        </div>
        <div className=" flex flex-col  max-w-md   bg-black/90 rounded-xl scale-90 transition-all hover:scale-100 duration-300  ">
          <img
            src="/src/images/segundo paso.jpg"
            className="w-[450px] h-[250px] object-cover object-center rounded-xl"
          />
          <div className="text-white flex items-center gap-2 px-2 mt-1 ">
            <span className=" px-2 rounded-full border border-white ">2</span>
            <h2 className="text-white font-oswald text-xl">Preparación</h2>
          </div>
          <p className="font-poppins text-white md:w-[450px] px-10">
            Colocamos las joyas en una tapa o recipiente pequeño y vertemos una
            cantidad suficiente de Catalim para cubrirlas.
          </p>
        </div>
        <div className="text-white flex flex-col  max-w-md    bg-black/90  rounded-xl scale-90 transition-all hover:scale-100 duration-300 ">
          <img
            src="/src/images/tercer paso.jpg"
            className="w-[450px] h-[250px] object-cover object-center rounded-xl"
          />
          <div className="flex items-center gap-2 mt-1 px-2">
            <span className=" px-2  rounded-full border border-white">3</span>
            <h2 className="font-oswald text-xl">Agitación suave</h2>
          </div>
          <p className="font-poppins md:w-[450px] px-10">
            Usamos un palillo o herramienta plástica para mover las joyas dentro
            del líquido y asegurar una limpieza pareja.
          </p>
        </div>

        {/* Parte 4 - 5  */}
        <div className="text-white flex flex-col  max-w-md     bg-black/90 rounded-xl scale-90 transition-all hover:scale-100 duration-300 ">
          <img
            src="/src/images/cuarto paso.jpg"
            className="w-[450px] h-[250px] object-cover object-center rounded-xl"
          />
          <div className="flex items-center gap-2 mt-1 px-2">
            <span className=" px-2  rounded-full border border-white">4</span>
            <h2 className="font-oswald text-xl">Reposo</h2>
          </div>
          <p className="font-poppins md:w-[400px]  px-10">
            Dejamos las joyas en remojo unos minutos para que el producto actúe
            sobre la suciedad y el óxido.
          </p>
        </div>
        <div className="text-white flex flex-col  max-w-md        bg-black/90 rounded-xl scale-90 transition-all hover:scale-100 duration-300 ">
          <img
            className="w-[450px] h-[250px] object-cover object-center rounded-xl"
            src="/src/images/quinto paso.jpg"
          />
          <div className="flex  items-center gap-2 mt-1 px-2 ">
            <span className="px-2   rounded-full border border-white">5</span>
            <h2 className="font-oswald text-xl">Resultado</h2>
          </div>
          <p className="font-poppins    md:w-[400px] px-10 ">
            Retiramos, enjuagamos y secamos. Las joyas quedan limpias,
            brillantes y como nuevas. 💎
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
