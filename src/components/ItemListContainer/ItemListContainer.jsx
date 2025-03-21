import { useState, useEffect } from "react";
import ItemList from "../ItemList";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import LoadingComponent from "../LoadingComponent";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const productsCollection = collection(db, "products");
    getDocs(productsCollection).then((snapshot) => {
      setProductos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  return productos.length <= 0 ? (
    <LoadingComponent /> // Agrego un loading component para la demora de carga del firebase
  ) : (
    <div className="container mx-auto">
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   xl:grid-cols-5 gap-20   place-items-center ">
        {productos.map((producto) => (
          <ItemList key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
