import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { clearSession } = useAuthContext();

  useEffect(() => {
    const conversationId = selectedConversation?._id;
    if (!conversationId) return;

    let cancelled = false; // ignore stale responses when switching chats quickly
    const getMessages = async () => {
      setLoading(true);
      setMessages([]);
      try {
        const res = await fetch(`/api/messages/recieve/${conversationId}`);
        if (res.status === 401) return clearSession();
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Couldn't load messages");
        if (!cancelled) setMessages(data);
      } catch (error) {
        if (!cancelled) toast.error(error.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    getMessages();
    return () => {
      cancelled = true;
    };
  }, [selectedConversation?._id, setMessages, clearSession]);

  return { messages, loading };
};

export default useGetMessages;
