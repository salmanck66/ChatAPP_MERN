import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";
import { extractTime } from "../../utils/TimExtracter";
import Avatar from "../Basic/Avatar";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const sender = fromMe ? authUser : selectedConversation;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const formattedTimee = extractTime(message.createdAt)
    const shakeClass = message.shake ? "message-shake" : "";


    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <Avatar user={sender} size="w-10 h-10" textSize="text-sm" />
            </div>

            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>

            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedTimee}</div>
        </div>
    );
};

export default Message;
