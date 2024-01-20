import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { initializeApp } from "firebase/app";
import { CartProvider } from "./components/context/CartContext.jsx";

const firebaseConfig = {
  apiKey: "AIzaSyCl0-oNZYvKOrC3oCkLvtyL4bGdsU7l7d0",
  authDomain: "nahu-tienda.firebaseapp.com",
  projectId: "nahu-tienda",
  storageBucket: "nahu-tienda.appspot.com",
  messagingSenderId: "977842635319",
  appId: "1:977842635319:web:ec60bacd9e82f05ed8f5b2",
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
