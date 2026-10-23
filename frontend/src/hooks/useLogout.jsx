import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../store/useConversation";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      toast.error("Couldn't reach the server, logged out locally");
    } finally {
      useConversation.getState().reset();
      setAuthUser(null);
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
