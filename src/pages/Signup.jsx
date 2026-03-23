import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [year, setYear] = useState("4th Year");
  const [branch, setBranch] = useState("CSE");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required ❌");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email ❌");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters ❌");
      return;
    }

    // ✅ SAVE USER
    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        year,
        branch,
        email,
      })
    );

    alert("Account Created Successfully ✅");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96 border border-gray-700">

        <h1 className="text-2xl font-bold text-center mb-6">
          Join CampusKart 🚀
        </h1>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none"
        >
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>

        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none"
        >
          <option>CSE</option>
          <option>IT</option>
          <option>ECE</option>
        </select>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 p-2 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold"
        >
          Create Account
        </button>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Already have an account? Login
        </p>

      </div>
    </div>
  );
}