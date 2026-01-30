import type { Card } from "../typo/type";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useParams } from "react-router-dom";

import CardComponent from "../components/Card";
import { Header } from "../components/Header";
import Columns from "../components/Columns";
import { useState } from "react";
import { updateCardStatus } from "../store/slice/boardSlice";

const columns = [
  { id: "todo", title: "To-do" },
  { id: "inprogress", title: "In Progress" },
  { id: "completed", title: "Completed" },
];

export default function BoardDetails() {
  const [draggedItem, setDraggedItem] = useState<Card | null>(null);

  const { boardId } = useParams();
  const currentBoard = useSelector((state: RootState) =>
    state.boards.find((board) => board.id === boardId),
  );
  const cards = currentBoard?.cards ?? [];

  const dispatch = useDispatch();

  function handleDragStart(card: Card) {
    setDraggedItem(card);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  // Drag/Drop Functionality
  function handleDrop(status: Card["status"]) {
    if (draggedItem && boardId && status !== draggedItem.status) {
      const updatedCard: Card = {
        ...draggedItem,
        status,
      };
      dispatch(updateCardStatus({ boardId, card: updatedCard }));
    }
    setDraggedItem(null);
  }

  return (
    <div className="w-full h-screen bg-board flex flex-col overflow-auto">
      <Header />

      {cards.length ? (
        <>
          <section className="p-5 sm:p-3 flex flex-wrap content-start gap-3 grow">
            {columns.map((col) => (
              <Columns
                key={col.id}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                colId={col.id}
                draggedItem={draggedItem}
              >
                <h5 className="text-sm font-semibold px-2 pt-1">{col.title}</h5>
                <div className="grow p-1 flex flex-wrap gap-1">
                  {cards
                    .filter((card) => card.status === col.id)
                    .map((card) => (
                      <CardComponent
                        card={card}
                        key={card.cardId}
                        handleDragStart={handleDragStart}
                      />
                    ))}
                </div>
              </Columns>
            ))}
          </section>
        </>
      ) : (
        <div className="flex w-full h-3/5 justify-center items-center flex-col">
          <p>Please create a new Card</p>
        </div>
      )}
    </div>
  );
}
