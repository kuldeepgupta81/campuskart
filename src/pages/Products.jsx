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

  // 🔥 FULL DUMMY DATA (IMPORTANT)
  const dummyProducts = [
    { _id: 1, name: "Book", price: 600 },
    { _id: 2, name: "Watch", price: 800 },
    { _id: 3, name: "Phone", price: 900 },
    { _id: 4, name: "Headphone", price: 1000 },
    { _id: 5, name: "Keyboard", price: 1100 },
    { _id: 6, name: "Mouse", price: 1200 },
    { _id: 7, name: "Bag", price: 1300 },
    { _id: 8, name: "Shoes", price: 1500 },
    { _id: 9, name: "Laptop", price: 50000 },
    { _id: 10, name: "Camera", price: 25000 },
    { _id: 11, name: "Speaker", price: 2000 },
    { _id: 12, name: "Jacket", price: 2200 },
    { _id: 13, name: "Chair", price: 3000 },
    { _id: 14, name: "Table", price: 4000 },
    { _id: 15, name: "Pen", price: 100 },
    { _id: 16, name: "Notebook", price: 200 },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          setProducts(dummyProducts);
        } else {
          setProducts(data);
        }
      } catch (err) {
        // 🔥 ALWAYS SHOW FULL DATA
        setProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔍 FILTER
  const filtered = products.filter((p) =>
    p?.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-2 min-h-screen bg-gray-50">

      {/* SEARCH + CART */}
      <div className="flex justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 w-full rounded text-sm"
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

      {/* AI */}
      <div className="bg-gray-100 p-3 rounded-xl shadow mb-4">
        <h2 className="font-bold mb-2 text-sm">🤖 AI Shopping Assistant</h2>
        <ChatAssistant products={products} />
      </div>

      {/* 🔥 FINAL GRID (FORCE 4 EVERYWHERE) */}
      <div className="grid grid-cols-4 gap-2">
        {filtered.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      {/* DRAWER */}
      <CheckoutDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
}