import { useState, useEffect } from "react";

export default function GroupDeal({ basePrice = 0, onPriceChange }) {
  const [users, setUsers] = useState(1);

  const price =
    users >= 5
      ? basePrice * 0.6
      : users >= 3
      ? basePrice * 0.8
      : basePrice;

  useEffect(() => {
    if (typeof onPriceChange === "function") {
      onPriceChange(Math.floor(price));
    }
  }, [users, basePrice]);

  return (
    <div className="border p-3 rounded mt-3 bg-gray-50">
      <h3 className="font-bold">👥 Group Deal</h3>

      <p>Users Joined: {users}</p>

      <button
        onClick={() => setUsers(users + 1)}
        className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
      >
        Join Group
      </button>

      <p className="mt-2 font-semibold text-purple-600">
        Discount Price: ₹{Math.floor(price)}
      </p>
    </div>
  );
}