import { WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import type { Card } from "../typo/type";

interface CardProp {
  card: Card;
}

export default function Card({ card }: CardProp) {
  return (
    <div>
      <Link
        to={`/boards/${card.boardId}/card/${card.cardId}`}
        className="flex flex-col gap-5 h-max min-w-30 max-w-60 p-5 bg-board bg-card group bg-background-900 rounded-xl border border-background-500 text-text hover:bg-background-700 hover:border-accent hover:text-accent transition-all duration-400 ease-in-out"
      >
        <div className="flex flex-col flex-1 gap-2 justify-center items-center p-3 group-hover:transition-all group-hover:duration-400 group-hover:ease-in-out">
          <WalletCards
            size={50}
            className="group-hover:transition-all group-hover:duration-400 group-hover:ease-in-out"
          />
          <h3 className="text-xl md:text-2xl font-bold group-hover:transition-all group-hover:duration-400 group-hover:ease-in-out">
            {card.cardTitle}
          </h3>
          <p className="flex-1 flex justify-center items-center text-sm font-medium text-center group-hover:transition-all group-hover:duration-400 group-hover:ease-in-out">
            {card.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
