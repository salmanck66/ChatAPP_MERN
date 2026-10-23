import useConversation from "../../store/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import Avatar from "../Basic/Avatar";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setselectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <button
        type="button"
        onClick={() => setselectedConversation(conversation)}
        className={`flex gap-3 items-center w-full text-left rounded-md hover:bg-slate-600 p-2 ${
          isSelected ? "bg-slate-800" : ""
        }`}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <Avatar user={conversation} />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="font-bold text-gray-200 truncate">{conversation.fullName}</p>
          <p className="text-xs text-gray-400 truncate">
            @{conversation.userName} · {isOnline ? "online" : "offline"}
          </p>
        </div>
      </button>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
