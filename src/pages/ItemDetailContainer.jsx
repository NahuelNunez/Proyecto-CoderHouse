import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../components/ItemDetail/ItemDetail";

export const ItemDetailContainer = () => {
  const [item, setItem] = useState({});
  const { id } = useParams();
  useEffect(() => {}, []);

  return (
    <div className="flex items-center justify-center   h-screen">
      {item && <ItemDetail item={item} />}
    </div>
  );
};
