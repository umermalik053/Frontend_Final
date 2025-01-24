import React, { useEffect, useState } from "react";
import { createResource, getResource } from "../../api/crud";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginReducer } from "../../store/feature/authReducer";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user,setUser] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  useEffect(() => {
    if(isAuthenticated){
        navigate("/")
    }
  }, [isAuthenticated])


  const handleChange = (e) => {
    const {name,value} = e.target
    setFormData({ ...formData, [name]: value});
    setMessage(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (!formData.email ||!formData.password) {
      setMessage("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const result = await createResource("/auth/login", formData);
      localStorage.setItem("token", result.token); // Save token to local storage
      setMessage("Login successful! Redirecting...");

      dispatch(loginReducer(result.user));
      setTimeout(() => navigate("/"), 1500); 
    } catch (error) {
      setMessage(error.message || "Login failed.");
      !error?.user?.emailVerified ? setUser(error?.user) : setUser(false)
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () =>{
    // 
    console.log(user)
    try {
      if(user?.email){
            await getResource(`/auth/resend-verification-email/${user?.email}`);
            setMessage("Verification email resent successfully!");
            setUser(false) 
      }
      
      
    } catch (error) {
      setMessage(error.message || "Failed to resend verification email.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {message && (
          <p className="text-center text-sm text-gray-600">{message}</p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <div className="flex items-center justify-between">
        <Link  to={"/login/forgotPassword"}>Forgot Password</Link>
        {
          user && (
            <button onClick={handleResend}>Resend Email</button>
          ) 
        }
      

        </div>
        <button
          type="submit"
          className="w-full  bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
