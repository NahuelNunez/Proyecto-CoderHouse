import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../components/ItemDetail";
import { getDoc, doc, getFirestore } from "firebase/firestore";
export const ItemDetailContainer = () => {
  const [item, setItem] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const db = getFirestore();
    const docRef = doc(db, "products", id);
    getDoc(docRef).then((doc) => {
      setItem({ id: doc.id, ...doc.data() });
    });
  }, [id]);

  return (
    <div className="flex items-center justify-center dark:bg-gray-900  h-screen">
      {item && <ItemDetail item={item} />}
    </div>
  );
};
