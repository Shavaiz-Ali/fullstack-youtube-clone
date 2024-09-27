import { CiSearch } from "react-icons/ci";
import { Input } from "./ui/input";
const SearchBox = () => {
  return (
    <div className="flex items-center px-2 border border-white w-[400px] h-[44px]">
      <CiSearch className="text-white h-6 w-6" />
      <Input
        name="search"
        placeholder="Search"
        className="bg-transparent border-none focus:bg-transparent text-white focus:ring-0 text-sm font-medium font-serif p-0 px-2"
      />
    </div>
  );
};

export default SearchBox;
