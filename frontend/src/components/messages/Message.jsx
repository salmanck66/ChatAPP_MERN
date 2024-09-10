import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";
import { extractTime } from "../../utils/TimExtracter";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const formattedTimee = extractTime(message.createdAt)
    const shakeClass = message.shake ? "message-shake" : "";

    console.log("Shake class applied:", message.shake);

    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt='Tailwind CSS chat bubble component' src={profilePic} />
                </div>
            </div>

            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>

            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedTimee}</div>
        </div>
    );
};

export default Message;
