import Home from "./pages/home/Home.jsx";   
import Login from "./pages/login/Login.jsx";   
import Signup from "./pages/signup/Signup.jsx"; 
import "@fontsource/poppins"; // Defaults to weight 400.
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
export default function App() {
  return (
    <div className="p-4 flex items-center h-screen justify-center ">
      <Routes>
        <Route path="/" element={<Home/>}> </Route>
        <Route path="/signup" element={<Signup/>}> </Route>
        <Route path="/login" element={<Login/>}> </Route>
      </Routes>
      <Toaster/>
    </div>
  );
}
