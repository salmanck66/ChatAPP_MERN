import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Home from "./pages/home/Home.jsx";   
import "@fontsource/poppins"; // Defaults to weight 400.

import "./App.scss";
export default function App() {
  return (
    <div className="p-4 flex items-center h-screen justify-center ">
      <Home />
      <div className="lines z-0">
        <div className="line"></div>
        <div className=""></div>
        <div className="line"></div>
      </div>
    </div>
  );
}
