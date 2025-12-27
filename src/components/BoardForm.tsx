import { Plus } from "lucide-react";

export default function BoardForm() {
  return (
    <form className="flex flex-row w-full text-sm sm:text-md md:text-base border border-neutral-500 rounded-sm ">
      <input
        type="text"
        placeholder="Board Title"
        className="flex-1 text-neutral-400 p-1 outline-0"
      />
      <button type="submit">
        <Plus className="size-7 text-amber-300 hover:text-amber-500 px-1" />
      </button>
    </form>
  );
}
