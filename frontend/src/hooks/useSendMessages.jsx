import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";
import { useAuthContext } from "../context/AuthContext";

const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation } = useConversation();
  const { clearSession } = useAuthContext();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (res.status === 401) return clearSession();

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Message not sent");

      const { messages, setMessages } = useConversation.getState();
      setMessages([...messages, data]);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessages;
