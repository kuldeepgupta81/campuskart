import { useState } from "react";

export default function ChatAssistant({ products }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = () => {
    const q = query.toLowerCase();

    const res = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.price <= Number(q)
    );

    setResults(res);
  };

  return (
    <div className="border p-4 rounded mt-6">
      <h3 className="font-bold">🤖 AI Assistant</h3>

      <input
        className="border p-2 w-full mt-2"
        placeholder="search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={search}
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
      >
        Search
      </button>

      {results.map((p, i) => (
        <div key={i} className="border p-2 mt-2 rounded">
          <p>{p.name}</p>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}