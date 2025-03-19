import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import Welcome from "../components/Welcome";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Home | Chelitas Joyas";
  }, []);

  return (
    <div className=" min-h-screen flex flex-col">
      <Welcome />
    </div>
  );
};

export default Home;
