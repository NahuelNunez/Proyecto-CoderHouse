import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBarComponent from "./components/NavBarComponent/NavBarComponent";
import Home from "./pages/Home";
import { ItemDetailContainer } from "./pages/ItemDetailContainer";
import { Category } from "./pages/Category";
import { Productos } from "./pages/Productos";

function App() {
  return (
    <BrowserRouter>
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/Productos/" element={<Productos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
