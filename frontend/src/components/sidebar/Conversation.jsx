import React from "react";
import useConversation from "../../store/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx }) => {
    const { selectedConversation, setselectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();

    const isOnline = onlineUsers.includes(conversation._id.toString());

    console.log('Online Users:', onlineUsers.map(id => typeof id));
    console.log('Conversation ID:', typeof conversation._id);
    console.log('Is Online:', isOnline);

    return (
        <>
            <div
                onClick={() => setselectedConversation(conversation)}
                className={`flex gap-2 items-center w-72 justify-between rounded-sm hover:bg-slate-600 p-2 py-1 cursor-pointer ${isSelected ? "bg-slate-800 rounded-sm" : ""}`}
            >
                <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                    <div className="rounded-full w-12">
                        <img className="hover:size-14" src={conversation.profilePic} alt="user avatar" />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-start">
                        <p className="font-bold text-gray-200">{conversation.fullName}</p>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
        </>
    );
};

export default Conversation;
