import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [year, setYear] = useState("4th Year");
  const [branch, setBranch] = useState("CSE");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    console.log("CLICKED 🔥");

    // ✅ VALIDATION
    if (!email.trim() || !password.trim()) {
      alert("Email aur password daal bhai 😑");
      return;
    }

    if (!name.trim()) {
      alert("Name daal bhai 😑");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    // 🔥 ADMIN ONLY
    const isAdmin = cleanEmail === "admin@campus.com";

    const userData = {
      name,
      year,
      branch,
      email: cleanEmail,
      role: isAdmin ? "admin" : "user",
    };

    // ✅ CLEAR OLD USER
    localStorage.removeItem("user");

    // ✅ SAVE NEW USER
    localStorage.setItem("user", JSON.stringify(userData));

    // 🔥 FORCE UI UPDATE
    window.dispatchEvent(new Event("userChanged"));

    console.log("LOGIN SUCCESS ✅", userData);

    navigate("/products");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96">

        <h1 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Create Account 🚀" : "Welcome Back 👋"}
        </h1>

        {/* 🔥 ALWAYS SHOW (FIX) */}
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none"
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

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
        />

        {/* BUTTON */}
        <button
          onClick={handleAuth}
          className="w-full bg-purple-600 p-2 rounded hover:bg-purple-700 transition"
        >
          {isSignup ? "Create Account" : "Login"}
        </button>

        {/* TOGGLE */}
        <p
          onClick={() => setIsSignup(!isSignup)}
          className="text-center mt-4 text-sm text-gray-400 cursor-pointer hover:text-white"
        >
          {isSignup
            ? "Already have an account? Login"
            : "New user? Create account"}
        </p>

      </div>
    </div>
  );
}