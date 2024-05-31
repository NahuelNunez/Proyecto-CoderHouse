import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../components/ItemList";
import {
  collection,
  getDocs,
  getFirestore,
  where,
  query,
} from "firebase/firestore";
export const Category = () => {
  const [titulo, setTitulo] = useState();
  const params = useParams();
  useEffect(() => {
    document.title = "Categoria | Chelitas Joyas";
    const db = getFirestore();
    const productsCollection = collection(db, "products");
    const q = query(productsCollection, where("category", "==", params.id));
    getDocs(q).then((snapshot) => {
      setTitulo(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, [params.id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-6 dark:bg-gray-900 w-[100%]  h-screen place-items-center">
      {titulo?.map((item) => (
        <div key={item.id}>
          <ItemList producto={item} />
        </div>
      ))}
    </div>
  );
};
