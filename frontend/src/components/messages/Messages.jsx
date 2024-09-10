import { useRef,useEffect } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessagesHook.jsx";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef();
  useListenMessages()

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading &&
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {messages.length === 0 && !loading && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;