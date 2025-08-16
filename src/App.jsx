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

import { WhatsApp } from "./WhatsApp";
import { TableOrder } from "./components/Admin/Table Order/TableOrder";
import { ChangePassword } from "./pages/ChangePassword";
import { RutaProtegida } from "./components/RutaProtegida.jsx/RutaProtegida";
import { useAuth } from "./components/Admin/Store/useAuth";
import { TableCategory } from "./components/Admin/Category/Table Category/TableCategory";
import { TableAdmins } from "./components/Admin/SuperAdmin/Table Admin/TableAdmins";
import { FinalizarCompra } from "./pages/finalizarCompra/FinalizarCompra";
import SucessPayment from "./pages/SucessPayment";
import FailurePayment from "./pages/FailurePayment";
import { NotFound } from "./pages/NotFound";

function App() {
  const { user } = useAuth();
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
            <Route path="*" element={<NotFound />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contacto />} />

            <Route
              path="/admin/TableOrders"
              element={
                <RutaProtegida roleRequired="admin">
                  <TableOrder />
                </RutaProtegida>
              }
            />
            <Route
              path="/superadmin/TableAdmins"
              element={
                <RutaProtegida roleRequired="superadmin">
                  <TableAdmins />
                </RutaProtegida>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <RutaProtegida roleRequired="admin" roleRequired2="operador">
                  <TableCategory user={user} />
                </RutaProtegida>
              }
            />

            <Route
              path="/changepassword"
              element={
                <RutaProtegida roleRequired={user?.rol}>
                  <ChangePassword />
                </RutaProtegida>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/checkout" element={<FinalizarCompra />} />
            <Route path="/payment/success" element={<SucessPayment />} />
            <Route path="/payment/failure" element={<FailurePayment />} />
          </Routes>
          <Footer />
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
