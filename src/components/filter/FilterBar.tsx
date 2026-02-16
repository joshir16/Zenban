import {
  CalendarArrowUp,
  CalendarArrowDown,
  ListFilter,
  Search,
  ArrowDownAz,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  Leaf,
} from "lucide-react";
import SelectMenu, { type SelectOption } from "../ui/SelectMenu";

const config = {
  default: { icon: CalendarArrowUp, text: "Oldest", color: "" },
  desc: { icon: CalendarArrowDown, text: "Newest", color: "blue-400" },
  alpha: { icon: ArrowDownAz, text: "A-Z", color: "blue-400" },
};

export type SortOption = "default" | "desc" | "alpha";
export type PriorityOption = "all" | "zen" | "low" | "medium" | "high";
type Prop = {
  sortOrder: SortOption;
  handleSortButton: () => void;
  priorityFilter: PriorityOption;
  setPriorityFilter: (value: PriorityOption) => void;
};

const priorityOptions: SelectOption[] = [
  { value: "all", label: "All", icon: ListFilter, color: "text-gray-300" },
  { value: "high", label: "High", icon: AlertCircle, color: "text-red-400" },
  {
    value: "medium",
    label: "Medium",
    icon: AlertTriangle,
    color: "text-yellow-400",
  },
  { value: "low", label: "Low", icon: ArrowDown, color: "text-blue-400" },
  { value: "zen", label: "Zen", icon: Leaf, color: "text-emerald-400" },
];

export default function FilterBar({
  sortOrder,
  handleSortButton,
  priorityFilter,
  setPriorityFilter,
}: Prop) {
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
        <SelectMenu
          value={priorityFilter}
          onValueChange={(val) => setPriorityFilter(val as PriorityOption)}
          options={priorityOptions}
        />

        <button
          className={`text-sm flex justify-center items-center gap-1 px-2 py-1 rounded-lg border border-background-500 border-${current.color} bg-${current.color}/10 hover:bg-background-500/5 transition-all duration-200`}
          onClick={handleSortButton}
        >
          <span className={`text-${current.color}`}>{current.text}</span>
          <Icon className={`size-4 text-${current.color}`} />
        </button>
      </div>
    </div>
  );
}
