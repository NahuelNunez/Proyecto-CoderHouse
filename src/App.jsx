import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBarComponent from "./components/NavBarComponent/NavBarComponent";
import Home from "./pages/Home";
import { ItemDetailContainer } from "./pages/ItemDetailContainer";
import { Category } from "./pages/Category";
import { Productos } from "./pages/Productos";
import About from "./pages/About";
import Contacto from "./pages/Contacto";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacto />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
