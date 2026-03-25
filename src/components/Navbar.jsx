import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // 🔥 USER SYNC
  useEffect(() => {
    const loadUser = () => {
      const u = JSON.parse(localStorage.getItem("user") || "null");
      setUser(u);
    };

    loadUser();

    window.addEventListener("userChanged", loadUser);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("userChanged", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 bg-white shadow z-[9999]">

      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer hover:scale-105 transition"
      >
        <img src="/logo.png" className="w-8 h-8" alt="logo" />
        <h1 className="text-xl font-bold text-purple-600">
          CampusKart
        </h1>
      </div>

      {/* LINKS */}
      <div className="flex gap-4 items-center">

        <button onClick={() => navigate("/products")} className="hover:text-purple-600">
          Products
        </button>

        <button onClick={() => navigate("/wishlist")} className="hover:text-red-500">
          ❤️ {wishlist.length}
        </button>

        <button onClick={() => navigate("/cart")} className="hover:text-green-600">
          🛒 {cart.length}
        </button>

        <button onClick={() => navigate("/orders")} className="hover:text-blue-600">
          Orders 📦
        </button>

        {isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Admin 🛠️
          </button>
        )}

        {user ? (
          <>
            <button
              onClick={() => navigate("/profile")}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 text-white px-3 py-1 rounded"
          >
            Login
          </button>
        )}

      </div>
    </nav>
  );
}