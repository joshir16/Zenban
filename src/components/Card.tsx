import { useNavigate, useParams } from "react-router-dom";
import type { Card } from "../typo/type";
import getCurrentTime from "../utils/utils";
import { memo } from "react";

interface CardProp {
  card: Card;
  handleDragStart: (card: Card) => void;
}

function CardComponent({ card, handleDragStart }: CardProp) {
  const { boardId } = useParams();
  const navigate = useNavigate();

  return (
    <div
      className="h-max flex-1 max-w-full text-left cursor-move group flex flex-col p-2 bg-background-900 rounded-xl border border-background-500 text-text-300 hover:bg-background-700 transition-all duration-400 ease-in-out"
      draggable
      onDragStart={() => handleDragStart(card)}
      onClick={() => navigate(`/boards/${boardId}/card/${card.cardId}`)}
    >
      <div
        className={`min-w-20 flex flex-col flex-1 gap-1 pl-2 ${card.priority} cursor-pointer`}
      >
        <h3 className="text-sm sm:text-base md:text-xl font-bold group-hover:text-accent group-hover:transition-all group-hover:duration-400 group-hover:ease-in-out">
          {card.cardTitle}
        </h3>
        <p className="flex-1 text-xs sm:text-sm font-normal tracking-wide truncate">
          {card.description}
        </p>
        <span className="text-[0.6rem] sm:text-xs font-medium text-text block text-end mt-0">
          {getCurrentTime(card.createdOn)}
        </span>
      </div>
    </div>
  );
}

export default memo(CardComponent);
