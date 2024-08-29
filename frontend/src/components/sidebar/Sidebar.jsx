import React from "react";
import Searchinput from "./Searchinput";
import Conversations from "./Conversations";
import LogoutButton from "./Logout";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-600 p-4 flex flex-col items-center">
      <Searchinput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton/>
    </div>
  );
};

export default Sidebar;
