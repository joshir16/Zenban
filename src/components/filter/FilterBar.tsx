import { Calendar, ListFilter, Search } from "lucide-react";

export default function FilterBar() {
  return (
    <div className="w-full h-auto flex gap-2 px-2 items-end justify-between">
      <div className="flex justify-center items-center gap-1 rounded-lg px-1 border border-background-500">
        <Search className="size-3 " />
        <input
          type="text"
          className="text-sm py-1 outline-none w-50 transition-all duration-300 focus:outline-none"
          placeholder="Search by title or #tag..."
        />
      </div>
      <div className="flex gap-3">
        <button className="text-sm flex justify-center items-center gap-1 rounded-lg px-2 py-1 border border-background-500">
          Priority
          <ListFilter className="size-3" />
        </button>
        <button className="text-sm flex justify-center items-center gap-1 rounded-lg px-2 py-1 border border-background-500">
          Sort
          <Calendar className="size-3" />
        </button>
      </div>
    </div>
  );
}
