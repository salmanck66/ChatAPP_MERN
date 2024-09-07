import React from "react";
import useConversation from "../../store/useConversation";  

const Conversation = ({conversation,lastIdx,}) => {
  const {selectedConversation,setselectedConversation } = useConversation()
  const isSelceted = selectedConversation?._id === conversation._id
  return (
    <>
    <div onClick={()=>setselectedConversation(conversation)} className={`flex gap-2 items-center w-72 justify-between rounded-sm hover:bg-slate-600 p-2 py-1 cursor-pointer ${isSelceted?"bg-slate-800 rounded-sm":""}`}>
      
      <div className="avatar online ">
        <div className="rounded-full  w-12 ">
          <img className=" hover:size-14" src={conversation.profilePic} alt="user avatar" srcSet="" />
        </div>
      </div>

      <div className="flex flex-col flex-1 ">
        <div className="flex gap-3  justify-start">
        <p className="font-bold text-gray-200">{conversation.fullName}</p>
        </div>
      </div>

    </div>

    {!lastIdx&&<div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;
