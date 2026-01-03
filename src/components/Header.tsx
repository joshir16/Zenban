import { Plus, Trash } from "lucide-react";

export function Header() {
  return (
    <header className="w-full flex justify-between items-center py-3 px-5 border-b border-primary">
      <h2 className="text-lg md:text-2xl  font-medium">boardname</h2>

      <div className="flex gap-4">
        {/* <button className="group 500px:text-xs sm:text-base flex gap-1 font-semibold justify-between items-center py-1 px-2 hover:bg-primary hover:text-neutral-200">
          <Plus className="size-5 font-bold text-primary group-hover:text-neutral-200" />
          Create Card
        </button> */}
        <button className="group 500px:text-xs sm:text-base flex gap-1 font-semibold justify-between items-center py-1 px-2 hover:bg-primary hover:text-neutral-200">
          <Trash className="size-5 font-bold text-primary group-hover:text-neutral-200" />
          Delete Board
        </button>
      </div>
    </header>
  );
}
