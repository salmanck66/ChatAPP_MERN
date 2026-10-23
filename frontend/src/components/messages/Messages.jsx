import { useRef, useEffect } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-y-auto min-h-0">
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.map((message) => <Message key={message._id} message={message} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center text-gray-300 mt-6">Send a message to start the conversation</p>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default Messages;
