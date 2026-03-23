import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();

  const getImage = (name) => {
    return `https://source.unsplash.com/300x300/?${name}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold p-6">❤️ Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="p-6 text-gray-500">No items yet 😔</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded shadow"
            >
              <img
                src={
                  item.image && item.image.startsWith("http")
                    ? item.image
                    : getImage(item.name)
                }
                className="w-full h-40 object-cover rounded"
              />

              <h2 className="mt-2 font-bold">{item.name}</h2>
              <p className="text-green-600">₹{item.price}</p>

              <button
                onClick={() => toggleWishlist(item)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
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