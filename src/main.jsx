import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ CONTEXTS
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ThemeProvider } from "./context/ThemeContext"; // 🌙 DARK MODE

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    {/* 🌙 THEME (GLOBAL) */}
    <ThemeProvider>

      {/* ❤️ WISHLIST */}
      <WishlistProvider>

        {/* 🛒 CART */}
        <CartProvider>

          {/* 🚀 APP */}
          <App />

        </CartProvider>
      </WishlistProvider>

    </ThemeProvider>

  </React.StrictMode>
);