import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white shadow-md">

      <h1
        className="text-xl font-bold text-purple-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        CampusKart 🎓
      </h1>

      <div className="flex gap-4 items-center">

        <button onClick={() => navigate("/products")}>Products</button>

        <button onClick={() => navigate("/wishlist")}>
          ❤️ {wishlist?.length || 0}
        </button>

        <button onClick={() => navigate("/cart")}>
          🛒 {cart?.length || 0}
        </button>

        <button onClick={() => navigate("/orders")}>
          Orders 📦
        </button>

        {/* ADMIN */}
        {user?.isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Admin 🛠️
          </button>
        )}

        {user && (
          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Profile 👤
          </button>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
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