import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResource } from "../../api/crud";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({ loading: true, success: null, message: "" });
  const verifyEmail = async () => {
    try {
      const response = await getResource(`/auth/verify-email/${token}`);
      console.log(response.message)
      setStatus({ loading: false, success: true, message: response?.message ||" success"});
      setTimeout(() => navigate("/login"), 3000); 
    } catch (error) {
      console.log(error.message)
      setStatus({
        loading: false,
        success: false,
        message: error.message || "Verification failed.",
      });
    }
  };

  useEffect(() => {
 
    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96 text-center">
        {status.loading ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-700">Verifying Email...</h2>
            <p className="text-gray-500 mt-2">Please wait while we confirm your email.</p>
          </div>
        ) : status.success ? (
          <div>
            <h2 className="text-2xl font-bold text-green-600">Email Verified!</h2>
            <p className="text-gray-500 mt-2">{status.message}</p>
            <p className="text-sm text-gray-400 mt-4">Redirecting to login...</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-red-600">Verification Failed</h2>
            <p className="text-gray-500 mt-2">{status.message}</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Go Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
