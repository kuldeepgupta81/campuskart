export default function Recommendation({ products }) {
  return (
    <div className="mt-6">
      <h2 className="font-bold text-lg">🔥 Recommended</h2>

      <div className="grid grid-cols-2 gap-3 mt-2">
        {products.slice(0, 4).map((p, i) => (
          <div key={i} className="border p-2 rounded">
            <p>{p.name}</p>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}