import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!mobile || !collegeId) {
      return alert("Enter all fields ❌");
    }

    // 🔥 ADMIN LOGIN
    const isAdmin = collegeId === "ADMIN123";

    // 🔥 STUDENT VALIDATION
    if (!isAdmin && !collegeId.startsWith("ABC")) {
      return alert("Invalid College ID ❌");
    }

    // 🔥 FORMAT NUMBER (WHATSAPP READY)
    let formattedPhone = mobile;

    if (!mobile.startsWith("91")) {
      formattedPhone = "91" + mobile;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: isAdmin ? "Admin" : "Student",
        mobile,
        phone: formattedPhone, // 🔥 IMPORTANT
        collegeId,
        isStudent: !isAdmin,
        isAdmin: isAdmin,
      })
    );

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-purple-100">
      <div className="bg-white p-8 rounded shadow w-96">

        <h1 className="text-2xl font-bold text-center mb-6">
          Login 🎓
        </h1>

        <input
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          placeholder="College ID"
          value={collegeId}
          onChange={(e) => setCollegeId(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={handleLogin}
          className="bg-purple-600 text-white w-full p-2 rounded"
        >
          Login 🚀
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Admin ID: ADMIN123
        </p>

      </div>
    </div>
  );
}