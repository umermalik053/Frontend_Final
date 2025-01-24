import React, { useState } from "react";
import { createResource } from "../../api/crud";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (!email) {
      setMessage("Email is required.");
      setLoading(false);
      return;
    }

    try {
      const response = await createResource("/auth/forgot-password", { email });
      setMessage("Password reset link sent! Please check your email.");
    } catch (error) {
      setMessage(error.message || "Failed to send password reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Forgot Password</h2>
        {message && (
          <p className={`text-center text-sm ${message.includes("sent") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setMessage("")
            setEmail(e.target.value)}}
          className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 transition"
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
