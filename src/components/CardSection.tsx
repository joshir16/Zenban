import type { Card } from "../typo/type";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useParams } from "react-router-dom";

import Columns from "../components/Columns";
import { useCallback, useState } from "react";
import { updateCardStatus } from "../store/slice/boardSlice";

const columnObj = [
  { id: "todo", title: "To-do" },
  { id: "inprogress", title: "In Progress" },
  { id: "completed", title: "Completed" },
];

export default function CardSection() {
  const [draggedItem, setDraggedItem] = useState<Card | null>(null);
  const dispatch = useDispatch();

  const { boardId } = useParams();
  const cards = useSelector((state: RootState) => {
    const board = state.boards.find((board) => board.id === boardId);
    return board?.cards || [];
  });

  const handleDragStart = useCallback((card: Card) => {
    setDraggedItem(card);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Drag/Drop Functionality
  const handleDrop = useCallback(
    (status: Card["status"]) => {
      if (draggedItem && boardId && status !== draggedItem.status) {
        const updatedCard: Card = {
          ...draggedItem,
          status,
        };
        dispatch(updateCardStatus({ boardId, card: updatedCard }));
      }
      setDraggedItem(null);
    },
    [draggedItem, boardId, dispatch],
  );

  return (
    <>
      {cards.length ? (
        <>
          <section className="p-5 sm:p-3 flex flex-wrap content-start gap-3 grow overflow-auto">
            {columnObj.map((col) => (
              <Columns
                key={col.id}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                col={col}
                boardId={boardId}
                draggedItem={draggedItem}
                handleDragStart={handleDragStart}
              />
            ))}
          </section>
        </>
      ) : (
        <div className="flex w-full h-3/5 justify-center items-center flex-col">
          <p>Please create a new Card</p>
        </div>
      )}
    </>
  );
}
