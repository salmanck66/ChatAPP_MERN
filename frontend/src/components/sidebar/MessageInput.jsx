import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessages from "../../hooks/useSendMessages";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessages();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text || loading) return;
    // Only clear the box if the message actually went through
    if (await sendMessage(text)) setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="relative w-full">
        <input
          type="text"
          className="ps-3 border text-sm rounded-lg block h-10 w-full bg-gray-700 border-gray-600 text-white pe-10"
          placeholder="Type a message"
          value={message}
          maxLength={2000}
          onChange={(e) => setMessage(e.target.value)}
          aria-label="Message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pe-3 text-white"
          disabled={loading}
          aria-label="Send"
        >
          {loading ? <span className="loading loading-spinner" /> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
