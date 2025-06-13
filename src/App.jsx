import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBarComponent from "./components/NavBarComponent/NavBarComponent";
import Home from "./pages/Home";
import { ItemDetailContainer } from "./pages/ItemDetailContainer";
import { Category } from "./pages/Category";
import { Productos } from "./pages/Productos";
import About from "./pages/About";
import Contacto from "./pages/Contacto";
import Footer from "./components/Footer/Footer";

import { Layout } from "./components/Layout/Layout";

import { Login } from "./components/Admin/Login";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./components/context/CartContext";
import { SignUp } from "./components/User/SignUp";

import { MetodoPago } from "./pages/Checkout/MetodoPago/MetodoPago";
import { Entrega } from "./pages/Checkout/Entrega/Entrega";
import { Resumen } from "./pages/Checkout/Resumen/Resumen";
import { Checkout } from "./pages/Checkout/Checkout";
import { Transferencia } from "./pages/Checkout/Transferencia/Transferencia";
import { WhatsApp } from "./WhatsApp";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <WhatsApp />
          <NavBarComponent />
          <ToastContainer />
          <Routes>
            {/* <Login /> */}
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contacto />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/CHECKOUT" element={<Checkout />}>
              <Route index element={<MetodoPago />} />
              <Route path="metodo-pago" element={<MetodoPago />} />
              <Route path="entrega" element={<Entrega />} />
              <Route path="transferencia" element={<Transferencia />} />
              <Route path="resumen/:id/:sessionId" element={<Resumen />} />
            </Route>
          </Routes>
          <Footer />
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
