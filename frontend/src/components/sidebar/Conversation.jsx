import React from "react";

const Conversation = () => {
  return (
    <>
    <div className="flex gap-2 items-center w-72 justify-between hover:bg-slate-600 p-2 py-1 cursor-pointer">
      
      <div className="avatar online ">
        <div className="rounded-full  w-12 ">
          <img className=" hover:size-14" src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png" alt="user avatar" srcSet="" />
        </div>
      </div>

      <div className="flex flex-col flex-1 ">
        <div className="flex gap-3  justify-start">
        <p className="font-bold text-gray-200">John Doew</p>
        </div>
      </div>

    </div>

    <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default Conversation;
