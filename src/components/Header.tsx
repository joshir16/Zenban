import { Plus } from "lucide-react";

export function Header() {
  return (
    <header className="w-full flex justify-between items-center  py-3 px-5 border-b border-amber-500">
      <h2 className="text-lg md:text-2xl  font-medium">boardname</h2>
      {/* <button className="500px:text-xs sm:text-sm flex justify-between items-center border-2 border-amber-500  py-1 px-2">
        <Plus className="size-5 text-amber-500" />
        New Card
      </button> */}
    </header>
  );
}
