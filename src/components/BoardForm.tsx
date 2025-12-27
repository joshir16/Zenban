import { Plus } from "lucide-react";

export default function BoardForm() {
  return (
    <form className="flex flex-row w-full text-sm sm:text-md md:text-base px-5 rounded-sm ">
      <input
        type="text"
        placeholder="Board Title"
        className="flex-1 text-neutral-400 outline-0  border-b border-neutral-500"
      />
      <button type="submit">
        <Plus className="size-7 text-amber-300 hover:text-amber-500 px-1 border-b border-neutral-500" />
      </button>
    </form>
  );
}
