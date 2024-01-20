import { useState, useEffect } from "react";
import ItemList from "../ItemList";
import { collection, getDocs, getFirestore } from "firebase/firestore";
const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const productsCollection = collection(db, "products");
    getDocs(productsCollection).then((snapshot) => {
      setProductos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  return (
    <div className="grid grid-cols-5 gap-6 mt-6 dark:bg-gray-900  w-[100%] h-screen place-items-center">
      {productos.map((producto) => (
        <ItemList key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default ItemListContainer;
