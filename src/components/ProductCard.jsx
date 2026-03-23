import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GroupDeal from "./GroupDeal";

export default function ProductCard({ product }) {
  if (!product) return null;

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [liked, setLiked] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);

  const navigate = useNavigate();

  const id = product?.id || product?._id;

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const discount = user?.isStudent ? 200 : 0;
  const basePrice = Math.max((product?.price || 0) - discount, 0);

  useEffect(() => {
    setFinalPrice(basePrice);
  }, [basePrice]);

  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  const trending = Math.random() > 0.7;

  // ✅ ONLY NAME BASED IMAGE (FINAL)
  const getImage = (name) => {
    const n = (name || "").toLowerCase();

    if (n.includes("notebook")) return "/notebook.png";
    if (n.includes("book")) return "/book.png";
    if (n.includes("pen")) return "/pen.png";

    if (n.includes("headphone") || n.includes("earphone"))
      return "/headphone.png";

    if (n.includes("iphone") || n.includes("phone") || n.includes("mobile"))
      return "/iphone.png";

    if (n.includes("laptop")) return "/laptop.png";
    if (n.includes("tablet")) return "/tablet.png";
    if (n.includes("keyboard")) return "/keyboard.png";
    if (n.includes("mouse")) return "/mouse.png";
    if (n.includes("speaker")) return "/speaker.png";
    if (n.includes("camera")) return "/camera.png";
    if (n.includes("charger")) return "/charger.png";

    if (n.includes("jacket")) return "/jacket.png";
    if (n.includes("tshirt") || n.includes("shirt")) return "/tshirt.png";
    if (n.includes("shoe")) return "/shoes.png";
    if (n.includes("watch")) return "/watch.png";
    if (n.includes("sunglass") || n.includes("glass"))
      return "/sunglasses.png";

    if (n.includes("bag")) return "/bag.png";
    if (n.includes("bottle")) return "/bottle.png";
    if (n.includes("chair")) return "/chair.png";

    return "/book.png";
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      id,
      price: finalPrice,
      quantity: 1,
    });
  };

  return (
    <div className="bg-white p-3 rounded-xl shadow hover:shadow-xl transition relative">

      {/* ❤️ Wishlist */}
      <button
        onClick={() => {
          setLiked((prev) => !prev);
          addToWishlist({ ...product, id });
        }}
        className="absolute top-2 right-2 text-lg"
      >
        {liked ? "❤️" : "🤍"}
      </button>

      {/* 🔥 Trending */}
      {trending && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          🔥 Trending
        </span>
      )}

      {/* 🖼️ IMAGE */}
      <div onClick={() => navigate(`/product/${id}`)}>
        <img
          src={getImage(product?.name)}   // ✅ FINAL FIX
          onError={(e) => (e.target.src = "/book.png")}
          className="h-40 w-full object-contain bg-white p-3 rounded cursor-pointer"
          alt={product?.name}
        />
      </div>

      {/* INFO */}
      <h3 className="mt-2 font-semibold">{product?.name}</h3>

      <p className="text-green-600 text-sm">⭐ {rating}</p>

      {/* PRICE */}
      <div className="flex items-center gap-2">
        <p className="font-bold text-purple-600">₹{finalPrice}</p>
        <span className="line-through text-gray-400 text-sm">
          ₹{product?.price}
        </span>
      </div>

      {discount > 0 && (
        <span className="text-green-600 text-xs block">
          🎓 Student Discount
        </span>
      )}

      <p className="text-xs text-gray-500">🚚 Free Delivery</p>

      <GroupDeal
        basePrice={basePrice}
        onPriceChange={setFinalPrice}
      />

      <button
        onClick={handleAddToCart}
        className="bg-purple-600 hover:bg-purple-700 text-white w-full mt-2 p-2 rounded"
      >
        Add to Cart 🛒
      </button>
    </div>
  );
}