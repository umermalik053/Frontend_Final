import AdminDashboard from "@/pages/admindashboard/AdminDashboard";
import MainLayout from "../layout/MainLayout";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Home from "../pages/Home";
import UserDashboard from "@/pages/userDashboard/userDashboard";
import DashboardAdmin from "@/pages/admindashboard/DashboardAdmin";
import DashboardUser from "@/pages/userDashboard/DashboardUser";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/verificationEmail/:token",
        element: <VerifyEmail />,
      },
      {
        path: "/login/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "resetPassword/:token",
        element: <ResetPassword />,
      },
     
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard/>,
    children:[
      {
        path: "dashboard",
        element:<DashboardAdmin/>,  // Replace with your actual component
      }
    ]
    
  },
  {
    path: "/user",
    element: <UserDashboard/>,
    children:[
      {
        path: "applied",
        element:<DashboardUser/>,  // Replace with your actual component
      }
    ]
    
  },
  {
    path: "*",
    element: <h1>Page not found</h1>,
    status: 404,

  }
  

];

export default routes;
