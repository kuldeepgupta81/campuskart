import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState("");

  // 🔥 QR STATE
  const [qr, setQr] = useState("");

  // 🔥 GENERATE QR WHEN ONLINE SELECTED
  useEffect(() => {
    if (payment === "online") {
      QRCode.toDataURL(
        `upi://pay?pa=test@upi&pn=CampusKart&am=${totalPrice}`,
        (err, url) => {
          if (!err) setQr(url);
        }
      );
    } else {
      setQr("");
    }
  }, [payment, totalPrice]);

  // 🔥 PLACE ORDER
  const handleOrder = async () => {
    if (!address.name || !address.address || !payment || !email) {
      return alert("Fill all details ❗");
    }

    try {
      await axios.post("http://localhost:5000/api/orders", {
        items: cart,
        total: totalPrice,
        address,
        payment,
        email,
      });

      clearCart();
      alert("✅ Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("❌ Order failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout 🧾</h1>

      {/* EMAIL */}
      <input
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* ADDRESS */}
      <input
        placeholder="Full Name"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setAddress({ ...address, name: e.target.value })
        }
      />

      <input
        placeholder="Address"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setAddress({ ...address, address: e.target.value })
        }
      />

      <input
        placeholder="City"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setAddress({ ...address, city: e.target.value })
        }
      />

      <input
        placeholder="Pincode"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setAddress({ ...address, pincode: e.target.value })
        }
      />

      {/* PAYMENT */}
      <select
        className="border p-2 w-full mb-3"
        onChange={(e) => setPayment(e.target.value)}
      >
        <option value="">Select Payment</option>
        <option value="cod">Cash on Delivery</option>
        <option value="online">Online Payment</option>
      </select>

      {/* 🔥 QR SHOW */}
      {payment === "online" && qr && (
        <div className="text-center mt-4">
          <p className="font-semibold">Scan & Pay</p>
          <img src={qr} className="w-40 mx-auto mt-2" />
          <p className="text-sm text-gray-500 mt-2">
            Pay ₹{totalPrice} via UPI
          </p>
        </div>
      )}

      {/* TOTAL */}
      <h2 className="font-bold text-lg mt-4">
        Total: ₹{totalPrice}
      </h2>

      {/* BUTTON */}
      <button
        onClick={handleOrder}
        className="bg-green-600 text-white w-full p-3 mt-4 rounded"
      >
        Place Order 🚀
      </button>
    </div>
  );
}