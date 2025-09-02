import { useState } from "react";
import { LogIn } from "lucide-react";

const LoginPage = ({ onLogin, loading, error, setCurrentPage }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onLogin(formData); // ✅ use onLogin instead of handleLogin
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <LogIn className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Login to QuickMart</h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setCurrentPage("register")}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            Don't have an account? Register here
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setCurrentPage("home")}
            className="text-gray-600 hover:text-gray-700 text-sm"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
