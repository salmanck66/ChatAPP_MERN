import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "@fontsource/poppins";
import "./App.scss";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import ResetPassword from "./pages/reset/ResetPassword.jsx";
import SetNewPassword from "./pages/reset/SetNewPassword.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";

export default function App() {
  const { authUser } = useAuthContext();
  const guestOnly = (page) => (authUser ? <Navigate to="/" /> : page);

  return (
    <div className="p-4 flex items-center h-dvh justify-center">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={guestOnly(<Signup />)} />
        <Route path="/login" element={guestOnly(<Login />)} />
        <Route path="/reset" element={guestOnly(<ResetPassword />)} />
        <Route path="/reset-password/:token" element={guestOnly(<SetNewPassword />)} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </div>
  );
}
