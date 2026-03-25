import { useState } from "react";

export default function GroupDeal({ basePrice = 0, onPriceChange }) {
  const [users, setUsers] = useState(1);

  const calculatePrice = (count) => {
    if (count >= 5) return basePrice * 0.6;
    if (count >= 3) return basePrice * 0.8;
    return basePrice;
  };

  const handleJoin = () => {
    const newUsers = users + 1;
    setUsers(newUsers);

    const newPrice = calculatePrice(newUsers);
    onPriceChange(Math.floor(newPrice));
  };

  return (
    <div className="border p-3 rounded mt-3 bg-gray-50">
      <h3 className="font-bold">👥 Group Deal</h3>

      <p>Users Joined: {users}</p>

      <button
        onClick={handleJoin}
        className="bg-green-600 text-white px-3 py-1 mt-2 rounded hover:bg-green-700"
      >
        Join Group
      </button>

      {/* ❌ REMOVE AUTO PRICE UPDATE */}
      {users > 1 && (
        <p className="mt-2 font-semibold text-purple-600">
          Discount Price: ₹{Math.floor(calculatePrice(users))}
        </p>
      )}
    </div>
  );
}