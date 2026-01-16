import { Link } from "react-router-dom";

export default function Card({ card }) {
  return (
    <Link
      to={`/boards/${card.boardId}/card/${card.cardId}`}
      className="flex flex-col gap-5 h-max min-w-30 max-w-60  border p-5 bg-board rounded-md bg-card text-text hover:bg-accent hover:text-neutral-900 transition-all duration-300"
    >
      <div className="flex flex-col flex-1 justify-center items-center p-3">
        <h3 className="text-2xl font-bold">{card.cardTitle}</h3>
      </div>
      <p className="flex-1 flex justify-center items-center text-sm font-medium text-center">
        {card.description}
      </p>
    </Link>
  );
}
