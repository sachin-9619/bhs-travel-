import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import Card from "../components/Card";

export default function AdminLogin() {
 const API_BASE = import.meta.env.VITE_API_BASE;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        alert("Login successful!");
        navigate("/admin-dashboard");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-50">
      <Card className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-indigo-700">
          Admin Login
        </h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border rounded-xl"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-linear-to-r from-indigo-600 to-pink-500"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Card>
    </div>
  );
}
