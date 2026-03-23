import { useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user?.name || "");

  // ✅ SAVE PROFILE
  const handleSave = () => {
    const updated = { ...user, name };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    setEdit(false);
  };

  if (!user) {
    return <h1 className="p-6">Login first ❌</h1>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="bg-white p-6 rounded shadow max-w-md mx-auto">

        <h1 className="text-2xl font-bold mb-4">Profile 👤</h1>

        {/* NAME */}
        {edit ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-2"
          />
        ) : (
          <p className="mb-2"><b>Name:</b> {user.name}</p>
        )}

        {/* MOBILE */}
        <p className="mb-2"><b>Mobile:</b> {user.mobile}</p>

        {/* COLLEGE ID */}
        <p className="mb-2"><b>College ID:</b> {user.collegeId}</p>

        {/* STUDENT */}
        <p className="mb-4 text-green-600">🎓 Student Account</p>

        {/* BUTTONS */}
        {edit ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Save ✅
          </button>
        ) : (
          <button
            onClick={() => setEdit(true)}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Edit ✏️
          </button>
        )}
      </div>
    </div>
  );
}