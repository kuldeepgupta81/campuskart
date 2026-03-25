import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GroupDeal from "./GroupDeal";

export default function ProductCard({ product }) {
  if (!product) return null;

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();

  const id = product?._id || product?.id;
  const basePrice = product?.price || 0;

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [liked, setLiked] = useState(false);
  const [finalPrice, setFinalPrice] = useState(basePrice);

  // 🔥 USER SYNC
  useEffect(() => {
    const updateUser = () => {
      const u = JSON.parse(localStorage.getItem("user") || "null");
      setUser(u);
    };

    window.addEventListener("userChanged", updateUser);
    return () => window.removeEventListener("userChanged", updateUser);
  }, []);

  // ✅ PREMIUM USER (ADMIN + USER)
  const isPremiumUser =
    user?.role === "user" || user?.role === "admin";

  const isAdmin = user?.role === "admin";

  // 🎯 PRICE
  const discountedPrice = isPremiumUser
    ? Math.max(basePrice - 100, 0)
    : basePrice;

  useEffect(() => {
    setFinalPrice(discountedPrice);
  }, [user, product]);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      id,
      price: finalPrice,
      quantity: 1,
    });
  };

  // 🖼️ 🔥 FINAL SMART IMAGE MAP (FIXED)
  const getImage = (name) => {
    const n = (name || "").toLowerCase().trim();

    // 📚 Books
    if (n.includes("book")) return "/book.png";
    if (n.includes("notebook")) return "/notebook.png";

    // ✏️ Stationary
    if (n.includes("pen")) return "/pen.png";
    if (n.includes("pant")) return "/pant.png";

    // 🎧 Electronics
    if (n.includes("head")) return "/headphone.png";
    if (n.includes("ear")) return "/headphone.png";

    if (n.includes("phone") || n.includes("mobile"))
      return "/iphone.png";

    if (n.includes("laptop")) return "/laptop.png";
    if (n.includes("tablet")) return "/tablet.png";

    if (n.includes("keyboard") || n.includes("key"))
      return "/keyboard.png";

    if (n.includes("mouse")) return "/mouse.png";

    if (n.includes("speaker")) return "/speaker.png";
    if (n.includes("camera")) return "/camera.png";

    // 👕 Fashion
    if (n.includes("watch")) return "/watch.png";

    if (n.includes("shirt") || n.includes("tshirt"))
      return "/tshirt.png";

    if (n.includes("shoe") || n.includes("nike"))
      return "/shoes.png";

    if (n.includes("sunglass")) return "/sunglasses.png";

    // 🎒 Others
    if (n.includes("bag")) return "/bag.png";
    if (n.includes("bottle")) return "/bottle.png";
    if (n.includes("chair")) return "/chair.png";
    if (n.includes("charger")) return "/charger.png";
     if (n.includes("jacket")) return "/jacket.png";

    
  };

  // ⭐ UI
  const rating = (Math.random() * 1 + 4).toFixed(1);
  const isTrending = Math.random() > 0.7;

  return (
    <div className="bg-white p-3 rounded-xl shadow hover:shadow-2xl transition relative">

      {/* 🔥 TRENDING */}
      {isTrending && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          🔥 Trending
        </span>
      )}

      {/* ❤️ */}
      <button
        onClick={() => {
          setLiked(!liked);
          addToWishlist({ ...product, id });
        }}
        className="absolute top-2 right-2 text-lg"
      >
        {liked ? "❤️" : "🤍"}
      </button>

      {/* IMAGE */}
      <div onClick={() => navigate(`/product/${id}`)}>
        <img
          src={getImage(product?.name)}
          onError={(e) => (e.target.src = "/book.png")}
          className="h-40 w-full object-contain p-3 cursor-pointer"
        />
      </div>

      {/* TITLE */}
      <h3 className="mt-2 font-semibold">{product?.name}</h3>

      {/* ⭐ RATING */}
      <p className="text-yellow-500 text-sm">⭐ {rating}</p>

      {/* 💰 PRICE */}
      <div className="flex items-center gap-2">
        <p className="font-bold text-purple-600 text-lg">
          ₹{Math.floor(finalPrice)}
        </p>

        {finalPrice < basePrice && (
          <span className="line-through text-gray-400 text-sm">
            ₹{basePrice}
          </span>
        )}
      </div>

      {/* 🔒 LOGIN */}
      {!user && (
        <p className="text-xs text-red-500 font-semibold">
          🔒 Login to unlock discount
        </p>
      )}

      {/* 🎓 DISCOUNT */}
      {isPremiumUser && (
        <p className="text-green-600 text-xs font-semibold">
          🎓 ₹100 Discount Applied
        </p>
      )}

      <p className="text-xs text-gray-500">🚚 Free Delivery</p>

      {/* 👥 GROUP DEAL */}
      {isPremiumUser && (
        <GroupDeal
          basePrice={discountedPrice}
          onPriceChange={(price) => setFinalPrice(price)}
        />
      )}

      {/* BUTTON */}
      <button
        onClick={handleAddToCart}
        className="bg-purple-600 text-white w-full mt-2 p-2 rounded hover:bg-purple-700"
      >
        Add to Cart 🛒
      </button>

    </div>
  );
}