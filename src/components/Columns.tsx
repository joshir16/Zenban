import type { Card } from "../typo/type";
import { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";

import CardComponent from "../components/Card";
import type { RootState } from "../store/store";
import { Virtuoso } from "react-virtuoso";

interface Prop {
  col: { id: string; title: string };
  boardId: string | undefined;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (status: Card["status"]) => void;
  handleDragStart: (card: Card) => void;
  sortOrder: "default" | "desc" | "alpha";
  priorityFilter: "all" | "zen" | "low" | "medium" | "high";
}

function Columns({
  handleDrop,
  handleDragOver,
  col,
  boardId,
  handleDragStart,
  sortOrder,
  priorityFilter,
}: Prop) {
  const cards = useSelector((state: RootState) => {
    const board = state.boards.find((board) => board.id === boardId);
    return board?.cards.filter((card) => card.status === col.id) || [];
  }, shallowEqual);

  let filteredCards;
  if (priorityFilter !== "all") {
    filteredCards =
      cards.filter((card) => card.priority === priorityFilter) || [];
  } else filteredCards = cards;

  let sortedCards;
  if (sortOrder === "default") sortedCards = filteredCards;

  if (sortOrder === "desc")
    sortedCards = filteredCards.sort((a, b) => {
      const dateA = new Date(a.createdOn).getTime();
      const dateB = new Date(b.createdOn).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateB - dateA;
    });

  if (sortOrder === "alpha")
    sortedCards = filteredCards
      .slice()
      .sort((a, b) => a.cardTitle.localeCompare(b.cardTitle));

  return (
    <>
      <div
        // className="min-h-[15%] md:min-h-1/3 lg:h-full flex-1 min-w-60 bg-columns flex-wrap border border-background-500 border-dashed border-primary/50"
        className="flex flex-col min-h-[40%] md:h-full min-w-60 grow bg-columns"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={() => handleDrop(col.id as Card["status"])}
      >
        <h5 className="shrink-0 text-sm font-semibold px-2 pt-1">
          {col.title}
        </h5>

        <div className="flex-1 min-h-0">
          <Virtuoso
            style={{ height: "100%" }} // Must take full height of parent
            data={sortedCards}
            overscan={200} // Pre-renders 200px of cards off-screen for smoothness
            // Item Renderer
            itemContent={(_, card) => (
              <div className="px-2 py-1">
                <CardComponent
                  card={card}
                  key={card.cardId} // Still good practice
                  handleDragStart={handleDragStart}
                />
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
}

export default memo(Columns);
