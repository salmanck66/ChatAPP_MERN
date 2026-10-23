import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";
import notisound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // Read the latest store state here instead of closing over it,
      // so the listener doesn't need to be re-registered on every message
      const { selectedConversation, messages, setMessages } = useConversation.getState();

      new Audio(notisound).play().catch(() => {}); // browsers may block autoplay

      if (selectedConversation?._id === newMessage.senderId) {
        setMessages([...messages, { ...newMessage, shake: true }]);
      } else {
        toast("New message received", { icon: "💬" });
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket]);
};

export default useListenMessages;
