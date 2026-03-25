import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null,
  });
  const [preview, setPreview] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ IMAGE SELECT
  const handleImage = (file) => {
    if (!file) return;

    setForm((prev) => ({ ...prev, image: file }));

    // 🔥 PREVIEW
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  // ✅ DRAG DROP
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Name & Price required!");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", form.name);
      data.append("price", form.price);

      if (form.image) {
        data.append("image", form.image); // 🔥 MUST
      }

      if (editId) {
        await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          data
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/products/add",
          data
        );
      }

      // RESET
      setForm({ name: "", price: "", image: null });
      setPreview("");
      setEditId(null);

      fetchProducts();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Image upload failed bro 😑");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  // ✅ EDIT
  const handleEdit = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      image: null,
    });

    // 🔥 FIXED IMAGE PATH
    const img = p.image?.startsWith("http")
      ? p.image
      : `http://localhost:5000/${p.image}`;

    setPreview(img);
    setEditId(p._id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel 🚀</h1>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 w-full mb-2 rounded"
        />

        {/* 🔥 UPLOAD */}
        <label
          htmlFor="fileInput"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed p-6 text-center cursor-pointer mb-2 block rounded hover:bg-gray-100"
        >
          Drag & Drop OR Click to Upload Image
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e.target.files[0])}
            className="hidden"
          />
        </label>

        {/* 🔥 PREVIEW */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 object-cover mb-2 rounded"
          />
        )}

        <button
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full"
        >
          {loading
            ? "Processing..."
            : editId
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>

      {/* ================= PRODUCTS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => {
          const img = p.image?.startsWith("http")
            ? p.image
            : `http://localhost:5000/${p.image}`;

          return (
            <div key={p._id} className="bg-white p-4 rounded shadow">

              {/* 🔥 FINAL IMAGE */}
              <img
                src={img}
                onError={(e) =>
                  (e.target.src =
                    "https://img.icons8.com/color/512/product.png")
                }
                className="h-24 object-cover mb-2 w-full rounded"
              />

              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-purple-600">₹{p.price}</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-blue-500 text-white px-2 py-1 rounded w-full"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}