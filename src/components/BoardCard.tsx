import { Layout } from "lucide-react";
import { Link } from "react-router-dom";
import type { Board } from "../typo/type";

interface BoardProp {
  board: Board;
}

export default function BoardCard({ board }: BoardProp) {
  return (
    <Link
      to={`/boards/${board.id}`}
      className="flex flex-col w-full p-5 bg-card rounded-xl bg-cards text-text hover:bg-accent hover:text-neutral-900 transition-all duration-300"
    >
      <div className="flex flex-col flex-1 justify-center items-center p-3">
        <Layout className="size-8" />
        <h3 className="text-2xl font-bold">{board.name}</h3>
      </div>
      <p className="flex-1 flex justify-center items-center text-sm font-medium">
        {board.cards.length} Cards
      </p>
    </Link>
  );
}
