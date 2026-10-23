import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const validate = ({ fullName, userName, confirmPassword, email, password, gender }) => {
  if (!fullName || !userName || !email || !password || !gender || !confirmPassword) {
    return "All fields are required.";
  }
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(userName)) {
    return "Username must be 3–20 letters, numbers or underscores.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format.";
  if (password.length < 6) return "Password must be at least 6 characters long.";
  if (password !== confirmPassword) return "Passwords do not match.";
  if (!["Male", "Female"].includes(gender)) return "Please select a gender.";
  return null;
};

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (form) => {
    const errorMsg = validate(form);
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      setAuthUser(data);
      toast.success("Account created!");
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
