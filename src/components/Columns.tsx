import type React from "react";
import type { Card } from "../typo/type";
import { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";

import CardComponent from "../components/Card";
import type { RootState } from "../store/store";

interface Prop {
  col: { id: string; title: string };
  boardId: string | undefined;
  draggedItem: Card | null;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (status: Card["status"]) => void;
  handleDragStart: (card: Card) => void;
}

function Columns({
  handleDragOver,
  handleDrop,
  col,
  boardId,
  draggedItem,
  handleDragStart,
}: Prop) {
  const cards = useSelector((state: RootState) => {
    const board = state.boards.find((board) => board.id === boardId);
    return board?.cards.filter((card) => card.status === col.id) || [];
  }, shallowEqual);

  return (
    <>
      <div
        className={`min-h-[15%] md:min-h-1/3 lg:h-full flex-1 min-w-60 bg-columns flex-wrap border border-background-500 ${
          draggedItem ? "border border-dashed border-primary/50" : ""
        }`}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={() => handleDrop(col.id as Card["status"])}
      >
        <h5 className="text-sm font-semibold px-2 pt-1">{col.title}</h5>
        <div className="grow p-1 flex flex-wrap gap-1">
          {cards.map((card) => (
            <CardComponent
              card={card}
              key={card.cardId}
              handleDragStart={handleDragStart}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default memo(Columns);
