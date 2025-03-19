const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center gap-40">
      <h1 className="font-semibold font-playfair  text-[40px] text-center py-4 text-white  sm:mt-[50px]">
        Cuidado de joya
      </h1>

      <div className=" flex items-center justify-around">
        <div className=" flex flex-col">
          <section className="w-[300px] h-[300px] bg-black">asd</section>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m.994 5.886c-.083-.777-1.008-1.16-1.617-.67l-.084.077l-2 2l-.083.094a1 1 0 0 0 0 1.226l.083.094l.094.083a1 1 0 0 0 1.226 0l.094-.083l.293-.293V16l.007.117a1 1 0 0 0 1.986 0L13 16V8z"
              />
            </svg>
            <h2> Prepara la solución de limpieza</h2>
          </div>
          <p>
            Mezcla agua tibia con unas gotas de jabón suave en un recipiente
            pequeño.
          </p>
        </div>
        <div>
          <section className="w-[300px] h-[300px] bg-black">asd</section>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m1 5h-3l-.117.007a1 1 0 0 0 0 1.986L10 9h3v2h-2l-.15.005a2 2 0 0 0-1.844 1.838L9 13v2l.005.15a2 2 0 0 0 1.838 1.844L11 17h3l.117-.007a1 1 0 0 0 0-1.986L14 15h-3v-2h2l.15-.005a2 2 0 0 0 1.844-1.838L15 11V9l-.005-.15a2 2 0 0 0-1.838-1.844z"
              />
            </svg>
            <h2>Limpia la joya con cuidado</h2>
            <p>
              Usa un cepillo de dientes suave para frotar suavemente la joya,
              prestando atención a los detalles y rincones.
            </p>
          </div>
        </div>
        <div>
          <section className="w-[300px] h-[300px] bg-black">asd</section>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m1 5h-2l-.15.005A2 2 0 0 0 9 9a1 1 0 0 0 1.974.23l.02-.113L11 9h2v2h-2l-.133.007c-1.111.12-1.154 1.73-.128 1.965l.128.021L11 13h2v2h-2l-.007-.117A1 1 0 0 0 9 15a2 2 0 0 0 1.85 1.995L11 17h2l.15-.005a2 2 0 0 0 1.844-1.838L15 15v-2l-.005-.15a2 2 0 0 0-.17-.667l-.075-.152l-.019-.032l.02-.03a2 2 0 0 0 .242-.795L15 11V9l-.005-.15a2 2 0 0 0-1.838-1.844z"
              />
            </svg>
            <h2>Enjuaga y seca</h2>
            <p>
              Enjuaga la joya con agua limpia y sécala con un paño suave y sin
              pelusa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
