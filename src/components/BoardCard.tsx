import { FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Board } from "../typo/type";

interface BoardProp {
  board: Board;
}

export default function BoardCard({ board }: BoardProp) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/boards/${board.id}`)}
      className="group flex flex-col w-full p-5 bg-background-900 rounded-xl border border-background-500 text-text hover:bg-background-700 hover:border-accent hover:text-accent transition-all duration-400 ease-in-out"
    >
      <div className="flex flex-col flex-1 gap-2 justify-center items-center p-3 group-hover:transition-all group-hover:duration-400 group-hover:ease-in-out">
        <FolderOpen className="size-8 sm:size-10 md:size-12" />
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:transition-all group-hover:duration-400 group-hover:ease-in-out">
          {board.name}
        </h3>
        <p className="flex-1 flex justify-center items-center text-sm font-medium group-hover:transition-all group-hover:duration-400 group-hover:ease-in-out">
          {board.cards.length
            ? `${board.cards.length} Cards`
            : `Please create a new Card`}
        </p>
      </div>
    </button>
  );
}
