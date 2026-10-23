import { useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import { IoArrowBack } from "react-icons/io5";
import Messages from "./Messages";
import Avatar from "../Basic/Avatar";
import MessageInput from "../sidebar/MessageInput";
import useConversation from "../../store/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

const MessageContainer = ({ className = "" }) => {
  const { selectedConversation, setselectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  useEffect(() => () => setselectedConversation(null), [setselectedConversation]);

  return (
    <div className={`flex-1 min-w-0 md:min-w-[450px] flex flex-col min-h-0 ${className}`}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500/80 px-3 py-2 mb-2 flex items-center gap-3">
            <button
              type="button"
              className="md:hidden btn btn-ghost btn-sm btn-circle"
              onClick={() => setselectedConversation(null)}
              aria-label="Back to contacts"
            >
              <IoArrowBack className="w-5 h-5" />
            </button>
            <Avatar user={selectedConversation} size="w-9 h-9" textSize="text-sm" />
            <div className="leading-tight">
              <p className="text-gray-50 font-bold">{selectedConversation.fullName}</p>
              <p className="text-xs text-gray-200">
                {onlineUsers.includes(selectedConversation._id) ? "online" : "offline"}
              </p>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
