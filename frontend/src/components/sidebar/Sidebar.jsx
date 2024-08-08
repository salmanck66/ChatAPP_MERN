import React from "react";
import Searchinput from "./Searchinput";
import Conversations from "./Conversation";

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center">
      <Searchinput />
      <div className="divider px-3"></div>
      <Conversations />
    </div>
  );
};

export default Sidebar;
