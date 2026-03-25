import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  const getImage = (name) => {
    const n = (name || "").toLowerCase();

    if (n.includes("book")) return "/book.png";
    if (n.includes("watch")) return "/watch.png";
    if (n.includes("phone")) return "/iphone.png";
    if (n.includes("headphone")) return "/headphone.png";

    return "/book.png";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">❤️ Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>No items</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {wishlist.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow"
            >

              <img
                src={getImage(item.name)}
                className="h-40 w-full object-contain mb-3"
              />

              <h3 className="font-semibold">{item.name}</h3>

              <p className="text-green-600 font-bold">
                ₹{item.price}
              </p>

              <button
                onClick={() => {
                  removeFromWishlist(index);
                }}
                className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
              >
                Remove
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}