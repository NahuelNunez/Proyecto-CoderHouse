import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { Link } from "react-router-dom";

const ItemList = ({ producto }) => {
  return (
    <Link to={`/item/${producto.id}`}>
      <Card
        key={producto.id}
        isPressable
        shadow="sm"
        onPress={() => console.log("item pressed")}
        className="w-64  flex flex-col items-center bg-[#18181B] rounded-lg gap-4 hover:scale-105 transition duration-500 ease-in-out"
      >
        <CardBody className="flex justify-center overflow-visible p-0 ">
          <img
            className=" object-cover object-center h-40 w-full rounded-t-lg rounded-b-lg "
            src={producto.imagen}
          />
        </CardBody>
        <CardFooter className="text-center justify-between px-4">
          <h3 className="font-semibold text-white ">{producto.titulo}</h3>
          <h3 className="font-semibold text-gray-500">{producto.precio} ARS</h3>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ItemList;
