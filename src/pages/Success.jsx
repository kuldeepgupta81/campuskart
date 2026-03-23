import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  const orderId = Math.floor(Math.random() * 1000000);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Order Placed Successfully!
      </h1>

      <p className="mt-2">Order ID: #{orderId}</p>
      <p className="text-gray-500">
        Delivery in 3-5 days 🚚
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-purple-600 text-white px-6 py-2 rounded"
      >
        Back to Home
      </button>
    </div>
  );
}