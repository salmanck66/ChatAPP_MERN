import { IoSearchSharp } from "react-icons/io5";

const SearchInput = ({ value, onChange }) => (
  <label className="input input-bordered rounded-full flex items-center gap-2 w-full">
    <IoSearchSharp className="w-5 h-5 opacity-60" />
    <input
      type="search"
      placeholder="Search people…"
      className="grow min-w-0"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search people"
    />
  </label>
);

export default SearchInput;
