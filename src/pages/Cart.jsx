import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, addToCart, decreaseQty, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <h2 className="p-6 text-center">Cart is empty 😢</h2>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-white p-4 mb-3 rounded shadow"
        >
          <div className="flex gap-4 items-center">
            <img src={item.image} className="h-20 w-20 rounded object-cover" />
            
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-green-600">⭐ {item.rating || 4.5}</p>
              <p className="text-sm text-gray-500">Quality: Premium</p>
              <p className="font-bold">₹{item.price}</p>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseQty(item.id)}
              className="px-2 bg-gray-300 rounded"
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => addToCart(item)}
              className="px-2 bg-gray-300 rounded"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Total */}
      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>

        <button
          onClick={() => navigate("/checkout")}
          className="bg-purple-600 text-white px-6 py-2 mt-3 rounded"
        >
          Proceed to Checkout 🚀
        </button>
      </div>
    </div>
  );
}