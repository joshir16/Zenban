import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../store/store";
import type { Card } from "../typo/type";
import { updateCardStatus } from "../store/slice/boardSlice";
import Columns from "../components/Columns";

const columnObj = [
  { id: "todo", title: "To-do" },
  { id: "inprogress", title: "In Progress" },
  { id: "completed", title: "Completed" },
];

export default function CardSection() {
  const dispatch = useDispatch();
  const { boardId } = useParams();

  // 1. Ref to store data silently (Fixes Drag Start Lag)
  const draggedItemRef = useRef<Card | null>(null);

  // 2. Ref to toggle CSS classes (Fixes Visuals)
  const containerRef = useRef<HTMLElement>(null);

  const cards = useSelector((state: RootState) => {
    const board = state.boards.find((board) => board.id === boardId);
    return board?.cards || [];
  });

  const handleDragStart = useCallback((card: Card) => {
    draggedItemRef.current = card;
    // Add visual class globally
    if (containerRef.current) containerRef.current.classList.add("is-dragging");
  }, []);

  // CRITICAL FIX: You must have this function for Drop to work!
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (status: Card["status"]) => {
      const item = draggedItemRef.current;

      if (item && boardId && status !== item.status) {
        // Fix: Update status on the existing item data
        const updatedCard = { ...item, status };
        dispatch(updateCardStatus({ boardId, card: updatedCard }));
      }

      // Cleanup
      draggedItemRef.current = null;
      if (containerRef.current)
        containerRef.current.classList.remove("is-dragging");
    },
    [boardId, dispatch],
  );

  return (
    <>
      {cards.length ? (
        <section
          ref={containerRef} // Attach Ref here for CSS
          className="p-5 sm:p-3 flex flex-wrap content-start gap-3 grow overflow-auto"
        >
          {columnObj.map((col) => (
            <Columns
              key={col.id}
              col={col}
              boardId={boardId}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver} // Pass this prop!
              handleDrop={handleDrop}
            />
          ))}
        </section>
      ) : (
        <div className="flex w-full h-3/5 justify-center items-center flex-col">
          <p>Please create a new Card</p>
        </div>
      )}
    </>
  );
}
