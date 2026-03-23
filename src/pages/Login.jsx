import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [year, setYear] = useState("4th Year");
  const [branch, setBranch] = useState("CSE");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) {
      return alert("Fill all fields ❌");
    }

    // ✅ SIMPLE EMAIL VALIDATION (NO BUG)
    if (!email.includes("@")) {
      return alert("Enter valid email ❌");
    }

    // 🔥 SAVE USER
    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        year,
        branch,
        email,
      })
    );

    alert("Account Created ✅");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-2xl font-bold text-center mb-6">
          Join CampusKart 🚀
        </h1>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700"
        >
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>

        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700"
        >
          <option>CSE</option>
          <option>IT</option>
          <option>ECE</option>
        </select>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 p-2 rounded hover:bg-purple-700"
        >
          Create Account
        </button>

      </div>
    </div>
  );
}