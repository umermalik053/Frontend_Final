import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Home from "../pages/Home";

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
      {
        path: "/dashboard",
        element: <DashboardLayout/>,
      },
    ],
  },
  

];

export default routes;
