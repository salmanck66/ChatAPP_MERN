import { useState } from "react";
import SearchInput from "./Searchinput";
import Conversations from "./Conversations";
import LogoutButton from "./Logout";
import Avatar from "../Basic/Avatar";
import { useAuthContext } from "../../context/AuthContext";

const Sidebar = ({ className = "" }) => {
  const [search, setSearch] = useState("");
  const { authUser } = useAuthContext();

  return (
    <div className={`border-r border-slate-600 p-4 flex flex-col w-full md:w-80 min-h-0 ${className}`}>
      <SearchInput value={search} onChange={setSearch} />
      <div className="divider my-2" />
      <Conversations search={search} />
      <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-600">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar user={authUser} size="w-8 h-8" textSize="text-xs" />
          <span className="text-sm text-gray-300 truncate">{authUser.fullName}</span>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
