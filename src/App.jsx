import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ COMPONENTS
import Navbar from "./components/Navbar";

// ✅ PAGES
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login"; // 🔐 Auth (Login + Signup)
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";

// ✅ SUCCESS PAGE
function Success() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-green-600">
        Order Placed Successfully ✅
      </h1>
      <p className="mt-2 text-gray-600">
        Thank you for shopping with CampusKart
      </p>
    </div>
  );
}

// ❌ 404 PAGE
function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen text-2xl font-bold bg-gray-100">
      404 - Page Not Found 🚫
    </div>
  );
}

export default function App() {
  return (
    <Router>
      
      {/* ✅ NAVBAR */}
      <Navbar />

      {/* ✅ MAIN CONTENT */}
      <div className="mt-16 min-h-screen bg-gray-50">
        <Routes>

          {/* 🏠 HOME */}
          <Route path="/" element={<Home />} />

          {/* 🛍️ PRODUCTS */}
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* 🛒 CART + CHECKOUT */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* 👤 USER */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* 🔐 AUTH */}
          <Route path="/login" element={<Login />} />

          {/* 🛠️ ADMIN */}
          <Route path="/admin" element={<Admin />} />

          {/* ✅ SUCCESS */}
          <Route path="/success" element={<Success />} />

          {/* ❌ 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>

    </Router>
  );
}