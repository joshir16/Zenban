import { Link } from "react-router-dom";
import type { Card } from "../typo/type";
import getCurrentTime from "../utils/utils";

interface CardProp {
  card: Card;
}

export default function Card({ card }: CardProp) {
  return (
    <div className="h-max flex-1 max-w-full md:max-w-[48%] lg:max-w-75">
      <Link
        to={`/boards/${card.boardId}/card/${card.cardId}`}
        className="flex flex-col gap-5 sm:gap-7 md:gap-10 p-2 bg-board bg-card group bg-background-900 rounded-xl border border-background-500 text-text-300 hover:bg-background-700  transition-all duration-400 ease-in-out"
      >
        <div className={`flex flex-col flex-1 gap-2 pl-2 ${card.priority}`}>
          <h3 className="text-xl md:text-2xl font-bold group-hover:text-accent group-hover:transition-all group-hover:duration-500 group-hover:ease-in-out">
            {card.cardTitle}
          </h3>
          <p className="flex-1 text-sm font-normal tracking-wide truncate">
            {card.description}
          </p>
          <span className="text-xs font-bold text-text block text-end">
            {getCurrentTime(card.createdOn)}
          </span>
        </div>
      </Link>
    </div>
  );
}
