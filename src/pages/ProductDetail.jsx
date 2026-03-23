import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

import BargainBox from "../components/BargainBox";
import GroupDeal from "../components/GroupDeal";
import ChatAssistant from "../components/ChatAssistant";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        const found = data.find((p) => (p._id || p.id) === id);
        setProduct(found);
      });
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <div className="flex flex-col md:flex-row gap-6">

        <img
          src={product.image || "https://picsum.photos/300"}
          className="h-64 w-full md:w-1/2 object-cover rounded"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-xl mt-2 text-green-600 font-semibold">
            ₹{product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-purple-600 text-white px-6 py-2 mt-4 rounded"
          >
            Add to Cart 🛒
          </button>

          {/* 🤝 BARGAIN */}
          <BargainBox price={product.price} />

          {/* 👥 GROUP DEAL */}
          <GroupDeal basePrice={product.price} />
        </div>
      </div>

      {/* 🤖 AI CHAT */}
      <ChatAssistant products={allProducts} />

    </div>
  );
}