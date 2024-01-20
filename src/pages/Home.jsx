import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import Welcome from "../components/Welcome";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Home | Chelitas Joyas";
  }, []);

  return (
    <div className="dark:bg-gray-900">
      <Welcome />
      <ItemListContainer />
    </div>
  );
};

export default Home;
