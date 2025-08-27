import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CartProvider from "./components/cart/CartContext.jsx";
import "./css/theme.css";
import { initTheme } from "./css/theme.js";
import App from "./App.jsx";

initTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
