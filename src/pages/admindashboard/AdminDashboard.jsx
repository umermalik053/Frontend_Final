import Navbar from "@/component/Navbar";
import Sidebar from "@/component/Sidebar";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const selector = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (selector?.role == "user") {
      navigate("/");
    }
  }, [selector]);
  return (
    <div>
      <Sidebar />
      <div class="p-16 mr-20 mt-10 sm:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
