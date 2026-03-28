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

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const update = () => setRefresh((prev) => !prev);
    window.addEventListener("userChanged", update);
    return () => window.removeEventListener("userChanged", update);
  }, []);

  // 🔥 IMAGE MAPPING (IMPORTANT)
  const imageMap = {
    book: "/book.png",
    watch: "/watch.png",
    phone: "/phone.png",
    headphone: "/headphone.png",
    keyboard: "/keyboard.png",
    mouse: "/mouse.png",
    bag: "/bag.png",
    shoes: "/shoes.png",
    laptop: "/laptop.png",
    camera: "/camera.png",
    speaker: "/speaker.png",
    jacket: "/jacket.png",
    chair: "/chair.png",
    pant: "/pant.png",
    pen: "/pen.png",
    notebook: "/notebook.png",
    tablet: "/tablet.png",
    bottle: "/bottle.png",
    tshirt: "/tshirt.png",
    sunglasses: "/sunglasses.png",
  };

  // 🔥 FULL DUMMY DATA
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
    { _id: 14, name: "Pant", price: 4000 },
    { _id: 15, name: "Pen", price: 100 },
    { _id: 16, name: "Notebook", price: 200 },
    { _id: 17, name: "Tablet", price: 1600 },
    { _id: 18, name: "Bottle", price: 1300 },
    { _id: 19, name: "T-shirt", price: 2000 },
    { _id: 20, name: "Sunglasses", price: 2200 },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        const finalData =
          Array.isArray(data) && data.length > 0 ? data : dummyProducts;

        // 🔥 ADD IMAGE AUTOMATICALLY
        const withImages = finalData.map((p) => ({
          ...p,
          image:
            imageMap[p.name?.toLowerCase()] ||
            "https://via.placeholder.com/300",
        }));

        setProducts(withImages);
      } catch (err) {
        const withImages = dummyProducts.map((p) => ({
          ...p,
          image:
            imageMap[p.name?.toLowerCase()] ||
            "https://via.placeholder.com/300",
        }));

        setProducts(withImages);
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
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-3 min-h-screen bg-gray-50">

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

      {/* 🔥 FORCE 4 COLUMN */}
      <div className="grid grid-cols-4 gap-2">
        {filtered.map((p) => (
          <ProductCard
            key={p._id + refresh}
            product={p}
          />
        ))}
      </div>

      <CheckoutDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
}