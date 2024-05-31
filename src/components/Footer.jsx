const Footer = () => {
  return (
    <div className=" bg-slate-950 flex flex-col md:flex-row  justify-between items-center py-10 h-full gap-5 mt-6 ">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex  gap-2">
          <img src="/src/assets/phone.svg" alt="Phone" />
          <p className="text-cyan-500 font-semibold">+54 264-410-6566</p>
        </div>
        <div className="flex gap-2">
          <img src="/src/assets/location.svg" alt="Location" />
          <p className="text-cyan-500 font-semibold"> Av.España 4654 Sur</p>
        </div>
        <div className="flex gap-2">
          <img src="/src/assets/gmail.svg" alt="" />
          <p className="text-cyan-500 font-semibold">
            chelitasJoyas03@gmail.com
          </p>
        </div>
      </div>
      <div>
        <span className="text-white font-semibold flex gap-2">
          Copyright
          <img src="/src/assets/copyright.svg"></img>2023 Chelitas Joyas
        </span>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-row gap-2">
          <a href="https://wa.me/+542644106566" target="_blank ">
            <img src="/src/assets/whatasapp.svg" />
          </a>
        </div>
        <div>
          <a href="https://www.instagram.com/natalia_joyeria/" target="_blank ">
            <img src="/src/assets/instagram.svg" alt="Instagram" />
          </a>
        </div>
        <div>
          <a
            href="https://www.facebook.com/natalia.moreno.98284?locale=es_LA"
            target="_blank "
          >
            <img src="/src/assets/facebook.svg" alt="Facebook" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
