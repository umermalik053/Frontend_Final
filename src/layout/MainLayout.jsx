import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const MainLayout = () => {
  return (
    <main>
      <Navbar />
        <Outlet />
      <Footer/>
    </main>
  );
};

export default MainLayout;
