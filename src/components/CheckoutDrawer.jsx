import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CheckoutDrawer({ open, setOpen }) {
  const {
    cart,
    addToCart,
    decreaseQty,
    removeFromCart,
    totalPrice,
    clearCart,
  } = useCart();

  const [step, setStep] = useState(1);

  const [address, setAddress] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [payment, setPayment] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
      <div className="w-full max-w-md h-full bg-white shadow-2xl p-5 overflow-y-auto">

        {/* ❌ CLOSE */}
        <button
          onClick={() => {
            setOpen(false);
            setStep(1);
          }}
          className="text-red-500 font-medium mb-3"
        >
          ✖ Close
        </button>

        {/* 🔥 STEP INDICATOR */}
        <div className="flex justify-between mb-5 text-sm font-semibold">
          <span className={step >= 1 ? "text-purple-600" : "text-gray-400"}>
            Cart
          </span>
          <span className={step >= 2 ? "text-purple-600" : "text-gray-400"}>
            Address
          </span>
          <span className={step >= 3 ? "text-purple-600" : "text-gray-400"}>
            Payment
          </span>
        </div>

        {/* ================= 🛒 STEP 1: CART ================= */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Your Cart 🛒</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500">Cart is empty 😢</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-3 bg-gray-50 p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>

                  {/* +/- */}
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

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}

            <h3 className="font-bold mt-4">Total: ₹{totalPrice}</h3>

            <button
              onClick={() => setStep(2)}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white w-full mt-4 p-3 rounded-lg font-semibold"
            >
              Continue →
            </button>
          </>
        )}

        {/* ================= 🏠 STEP 2: ADDRESS ================= */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Address 🏠</h2>

            <input
              placeholder="Name"
              className="border p-3 rounded w-full mb-2"
              onChange={(e) =>
                setAddress({ ...address, name: e.target.value })
              }
            />

            <input
              placeholder="Address"
              className="border p-3 rounded w-full mb-2"
              onChange={(e) =>
                setAddress({ ...address, address: e.target.value })
              }
            />

            <input
              placeholder="City"
              className="border p-3 rounded w-full mb-2"
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value })
              }
            />

            <input
              placeholder="Pincode"
              className="border p-3 rounded w-full"
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />

            <button
              onClick={() => setStep(3)}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white w-full mt-4 p-3 rounded-lg font-semibold"
            >
              Next →
            </button>
          </>
        )}

        {/* ================= 💳 STEP 3: PAYMENT ================= */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-4">Payment 💳</h2>

            <label className="block mb-2">
              <input
                type="radio"
                value="cod"
                onChange={(e) => setPayment(e.target.value)}
              />{" "}
              Cash on Delivery
            </label>

            <label className="block mb-3">
              <input
                type="radio"
                value="online"
                onChange={(e) => setPayment(e.target.value)}
              />{" "}
              Online Payment
            </label>

            {/* QR */}
            {payment === "online" && (
              <div className="text-center mb-3">
                <p className="mb-2">Scan & Pay 📱</p>
                <img
                  className="mx-auto"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=test@upi&pn=CampusKart&am=${totalPrice}`}
                />
              </div>
            )}

            <button
              onClick={() => {
                // 🔥 SAVE ORDER
                const newOrder = {
                  orderId: Math.floor(Math.random() * 1000000),
                  items: cart,
                  total: totalPrice,
                  payment,
                  address,
                  createdAt: Date.now(),
                };

                const existing =
                  JSON.parse(localStorage.getItem("orders")) || [];

                localStorage.setItem(
                  "orders",
                  JSON.stringify([newOrder, ...existing])
                );

                clearCart();
                setStep(4);
              }}
              className="bg-green-600 text-white w-full mt-4 p-3 rounded-lg font-semibold"
            >
              Place Order 🚀
            </button>
          </>
        )}

        {/* ================= 🎉 STEP 4: SUCCESS ================= */}
        {step === 4 && (
          <div className="text-center mt-10">
            <h2 className="text-green-600 text-2xl font-bold">
              🎉 Order Successful!
            </h2>

            <p className="mt-2 text-gray-500">
              Delivery in 3-5 days 🚚
            </p>

            <button
              onClick={() => {
                setOpen(false);
                setStep(1);
              }}
              className="bg-purple-600 text-white mt-6 px-6 py-2 rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}