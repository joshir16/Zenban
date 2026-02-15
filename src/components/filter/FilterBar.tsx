import {
  CalendarArrowUp,
  CalendarArrowDown,
  ListFilter,
  Search,
  ArrowDownAz,
} from "lucide-react";

const config = {
  default: { icon: CalendarArrowUp, text: "Oldest", color: "" },
  desc: { icon: CalendarArrowDown, text: "Newest", color: "blue-400" },
  alpha: { icon: ArrowDownAz, text: "A-Z", color: "blue-400" },
};

type Prop = {
  sortOrder: "default" | "desc" | "alpha";
  handleSortButton: () => void;
};

export default function FilterBar({ sortOrder, handleSortButton }: Prop) {
  const current = config[sortOrder];
  const Icon = current.icon;

  return (
    <div className="w-full h-auto flex gap-2 px-2 items-end justify-between">
      <div className="flex justify-center items-center gap-1 rounded-lg px-1 border border-background-500">
        <Search className="size-3 text-text" />
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

        <button
          className={`text-sm flex justify-center items-center gap-1 px-2 py-1 rounded-lg border border-background-500 border-${current.color} bg-${current.color}/10`}
          onClick={handleSortButton}
        >
          <span className={`text-${current.color}`}>{current.text}</span>
          <Icon className={`size-4 text-${current.color}`} />
        </button>
      </div>
    </div>
  );
}
