import Login from "./pages/login/Login.jsx";
import "./App.scss"
export default function App() {
  return (
    <div className="p-4 flex items-center h-screen justify-center ">
      <Login />
      <div className="lines z-0">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
}
