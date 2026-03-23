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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        console.log("API DATA 👉", data);

        if (!Array.isArray(data) || data.length === 0) {
          setProducts([
            { _id: 1, name: "Book", price: 500 },
            { _id: 2, name: "Shoes", price: 1200 },
            { _id: 3, name: "Laptop", price: 50000 },
            { _id: 4, name: "Headphone", price: 1500 },
          ]);
        } else {
          setProducts(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);

        setProducts([
          { _id: 1, name: "Book", price: 500 },
          { _id: 2, name: "Shoes", price: 1200 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
    p?.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 text-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4">

      {/* 🔍 TOP BAR */}
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

      {/* 🤖 AI ASSISTANT (🔥 TOP PE SHIFTED) */}
      <div className="bg-gray-100 p-4 rounded-xl shadow mb-6">
        <h2 className="font-bold mb-2">🤖 AI Shopping Assistant</h2>
        <ChatAssistant products={products} />
      </div>

      {/* 🛍️ PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found 😢
          </p>
        )}
      </div>

      {/* 🛒 DRAWER */}
      <CheckoutDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
}