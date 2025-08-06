import { Card, CardBody, CardFooter } from "@heroui/card";

const Welcome = () => {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <h1 className="uppercase font-playfair  text-[40px] text-center py-4 text-white  sm:mt-[50px]">
        Cuidado de joya
      </h1>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] md:grid-cols-[repeat(2,_minmax(200px,_1fr))] lg:grid-cols-[repeat(2,_minmax(200px,_1fr))] xl:grid-cols-[repeat(3,_minmax(200px,_1fr))] place-items-center place-content-center  gap-10 mb-10">
        <Card className="py-4 bg-black/90 group hover:scale-110 ease-in-out transition-all duration-200">
          <CardBody className="overflow-visible py-1">
            <img
              className="object-cover rounded-xl"
              src="/images/platalim.png"
              width={260}
              height={260}
            ></img>
          </CardBody>
          <CardFooter className="pb-0 pt-2 px-4 flex-col gap-2 items-start">
            <p className="text-tiny uppercase font-bold text-white font-oswald text-[13px]">
              <span className="border rounded-full px-[8px] py-[2px] group-hover:bg-sky-500 group-hover:ease-in-out group-hover:transition-all group-hover:duration-200 ">
                1
              </span>{" "}
              Presentación del producto
            </p>
            <small className="w-[250px] font-poppins text-[12px] tracking-wide group-hover:text-sky-500  group-hover:ease-in-out group-hover:transition-all group-hover:duration-200 leading-6 text-white">
              Mostramos el frasco de Platalim,el liquido limpiador que usaremos
              para dejar nuestras joyas relucientes.
            </small>
          </CardFooter>
        </Card>

        <Card className="py-4 bg-black/90 group hover:scale-110 ease-in-out transition-all duration-200">
          <CardBody className="overflow-visible py-1">
            <img
              className="object-cover rounded-xl h-[250px]"
              src="/images/segundo paso.jpg"
              width={260}
            ></img>
          </CardBody>
          <CardFooter className="pb-0 pt-2 px-4 flex-col gap-2 items-start">
            <p className="text-tiny uppercase font-bold text-white font-oswald text-[13px]">
              <span className="border rounded-full px-[8px] py-[2px] group-hover:bg-sky-500 group-hover:ease-in-out group-hover:transition-all group-hover:duration-200 ">
                2
              </span>{" "}
              Preparación
            </p>
            <small className="w-[250px] font-poppins text-[12px] tracking-wide group-hover:text-sky-500  group-hover:ease-in-out group-hover:transition-all group-hover:duration-200 leading-6 text-white">
              Colocamos las joyas en una tapa o recipiente pequeño y vertemos
              una cantidad suficiente de Catalim para cubrirlas.
            </small>
          </CardFooter>
        </Card>

        <Card className="py-4 bg-black/90 group hover:scale-110 ease-in-out transition-all duration-200">
          <CardBody className="overflow-visible py-1">
            <img
              className="object-cover rounded-xl h-[250px]"
              src="/images/tercer paso.jpg"
              width={260}
            ></img>
          </CardBody>
          <CardFooter className="pb-0 pt-2 px-4 flex-col gap-2 items-start">
            <p className="text-tiny uppercase font-bold text-white font-oswald text-[13px]">
              <span className="border rounded-full px-[8px] py-[2px] group-hover:bg-sky-500 group-hover:ease-in-out group-hover:transition-all group-hover:duration-200 ">
                3
              </span>{" "}
              Agitación suave
            </p>
            <small className="w-[250px] font-poppins text-[12px] tracking-wide group-hover:text-sky-500  group-hover:ease-in-out group-hover:transition-all group-hover:duration-200 leading-6 text-white">
              Usamos un palillo o herramienta plástica para mover las joyas
              dentro del líquido y asegurar una limpieza pareja.
            </small>
          </CardFooter>
        </Card>

        {/* Parte 4 - 5  */}
        <Card className="py-4 bg-black/90 group hover:scale-110 ease-in-out transition-all duration-200">
          <CardBody className="overflow-visible py-1">
            <img
              className="object-cover rounded-xl h-[250px]"
              src="/images/tercer paso.jpg"
              width={260}
            ></img>
          </CardBody>
          <CardFooter className="pb-0 pt-2 px-4 flex-col gap-2 items-start">
            <p className="text-tiny uppercase font-bold text-white font-oswald text-[13px]">
              <span className="border rounded-full px-[8px] py-[2px] group-hover:bg-sky-500 group-hover:ease-in-out group-hover:transition-all group-hover:duration-200 ">
                4
              </span>{" "}
              Reposo
            </p>
            <small className="w-[250px] font-poppins text-[12px] tracking-wide group-hover:text-sky-500  group-hover:ease-in-out group-hover:transition-all group-hover:duration-200 leading-6 text-white">
              Dejamos las joyas en remojo unos minutos para que el producto
              actúe sobre la suciedad y el óxido.
            </small>
          </CardFooter>
        </Card>
        <Card className="py-4 bg-black/90 group hover:scale-110 ease-in-out transition-all duration-200">
          <CardBody className="overflow-visible py-1">
            <img
              className="object-cover rounded-xl h-[250px]"
              src="/images/tercer paso.jpg"
              width={260}
            ></img>
          </CardBody>
          <CardFooter className="pb-0 pt-2 px-4 flex-col gap-2 items-start">
            <p className="text-tiny uppercase font-bold text-white font-oswald text-[13px]">
              <span className="border rounded-full px-[8px] py-[2px] group-hover:bg-sky-500 group-hover:ease-in-out group-hover:transition-all group-hover:duration-200 ">
                5
              </span>{" "}
              Resultado
            </p>
            <small className="w-[250px] font-poppins text-[12px] tracking-wide group-hover:text-sky-500  group-hover:ease-in-out group-hover:transition-all group-hover:duration-200 leading-6 text-white">
              Retiramos, enjuagamos y secamos. Las joyas quedan limpias,
              brillantes y como nuevas.
            </small>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
