import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createResource } from "../../api/crud";
// import axiosInstance from "../api/axiosInstance";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
    const [status, setStatus] = useState({ loading: false, message: "" });
    const navigate = useNavigate();
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!newPassword) {
        setStatus({ message: "Password is required." });
        return;
      }
      setStatus({ loading: true, message: "loading.." });
      try {
        const response = await createResource(`/auth/reset-password/${token}`, { newPassword });
        setStatus({ loading: false, message: response?.message || "Password reset successfully." });
        setTimeout(() => navigate("/login"), 3000); // Uncomment to redirect after 3 seconds


      } catch (err) {
        console.log(err.message);
        setStatus({ loading: false, message: err?.message || "Reset failed. Please try again." });
      }
    };

  return (
    <div className=" min-h-screen flex justify-center items-center w-full">
<form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
      <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
      {status.message && (
        <p className={`text-center mb-2 text-sm ${status.message.includes("success")? "text-green-600" : "text-red-600"}`}>
          {status.message}
        </p>
      )}
      <input
        type="password"
        name="newPassword"
        placeholder="Enter new password"
        onChange={(e) =>{
          setNewPassword(e.target.value)}}
        className="w-full mb-3 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition">{
    status.loading ? "Please wait..." : "Reset Password"
    }</button>
    </form>
    </div>
    
  );
};

export default ResetPassword;
