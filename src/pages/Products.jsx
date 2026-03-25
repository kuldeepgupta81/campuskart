import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CheckoutDrawer from "../components/CheckoutDrawer";
import { useCart } from "../context/CartContext";
import ChatAssistant from "../components/ChatAssistant";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const { cart } = useCart();
  const [openDrawer, setOpenDrawer] = useState(false);

  // 🔥 USER CHANGE → RE-RENDER (NO REFETCH)
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const update = () => setRefresh((prev) => !prev);

    window.addEventListener("userChanged", update);
    return () => window.removeEventListener("userChanged", update);
  }, []);

  // 🔥 FETCH ONLY ON FIRST LOAD
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          setProducts([
            { _id: 1, name: "Book", price: 600 },
            { _id: 2, name: "Watch", price: 800 },
            { _id: 3, name: "Phone", price: 900 },
            { _id: 4, name: "Headphone", price: 1000 },
          ]);
        } else {
          setProducts(data);
        }
      } catch (err) {
        setProducts([
          { _id: 1, name: "Book", price: 600 },
          { _id: 2, name: "Watch", price: 800 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // ❌ REMOVE refresh dependency

  // 🔥 FILTER
  const filtered = products.filter((p) =>
    p?.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-4 min-h-screen bg-gray-50">

      {/* 🔍 SEARCH + CART */}
      <div className="flex justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 w-full rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div
          onClick={() => setOpenDrawer(true)}
          className="relative cursor-pointer text-xl"
        >
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              {cart.length}
            </span>
          )}
        </div>
      </div>

      {/* 🤖 AI */}
      <div className="bg-gray-100 p-4 rounded-xl shadow mb-6">
        <h2 className="font-bold mb-2">🤖 AI Shopping Assistant</h2>
        <ChatAssistant products={products} />
      </div>

      {/* 🛍️ GRID FIX */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
        {filtered.map((p) => (
          <ProductCard
            key={p._id + refresh} // 🔥 FORCE RE-RENDER ON LOGIN
            product={p}
          />
        ))}
      </div>

      {/* 🧾 DRAWER */}
      <CheckoutDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
}