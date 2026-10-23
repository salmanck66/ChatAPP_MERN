import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const { clearSession } = useAuthContext();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        if (res.status === 401) return clearSession();
        const data = await res.json();
        if (!res.ok || !Array.isArray(data)) throw new Error(data.error || "Couldn't load contacts");
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [clearSession]);

  return { loading, conversations };
};

export default useGetConversations;
