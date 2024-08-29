import Home from "./pages/home/Home.jsx";   
import Login from "./pages/login/Login.jsx";   
import Signup from "./pages/signup/Signup.jsx"; 
import "@fontsource/poppins"; // Defaults to weight 400.
import "./App.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";
export default function App() {
  const {authUser}= useAuthContext()
  return (
    <div className="p-4 flex items-center h-screen justify-center ">
      <Routes>
        <Route path="/" element={authUser?<Home/>:<Navigate to="/login"/>}> </Route>
        <Route path="/signup" element={authUser?<Navigate to="/"/>:<Signup/>} > </Route>
        <Route path="/login" element={authUser ?<Navigate to="/"/> :<Login/>}> </Route>
      </Routes>
      <Toaster/>
    </div>
  );
}
