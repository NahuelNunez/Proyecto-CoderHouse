import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBarComponent from "./components/NavBarComponent/NavBarComponent";
import Home from "./pages/Home";
import { ItemDetailContainer } from "./pages/ItemDetailContainer";
import { Category } from "./pages/Category";
import { Productos } from "./pages/Productos";
import About from "./pages/About";
import Contacto from "./pages/Contacto";
import Footer from "./components/Footer";
import Detail from "./pages/Detail";
import { Layout } from "./components/Layout/Layout";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <NavBarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contacto />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>

        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
