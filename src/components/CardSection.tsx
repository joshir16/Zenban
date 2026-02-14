import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../store/store";
import type { Card } from "../typo/type";
import { updateCardStatus } from "../store/slice/boardSlice";
import Columns from "../components/Columns";
import FilterBar from "./FilterBar";

const columnObj = [
  { id: "todo", title: "To-do" },
  { id: "inprogress", title: "In Progress" },
  { id: "completed", title: "Completed" },
];

export default function CardSection() {
  const dispatch = useDispatch();
  const { boardId } = useParams();

  const draggedItemRef = useRef<Card | null>(null);

  const containerRef = useRef<HTMLElement>(null);

  const cardsLength = useSelector((state: RootState) => {
    const board = state.boards.find((board) => board.id === boardId);
    return board?.cards.length || 0;
  });

  const handleDragStart = useCallback((card: Card) => {
    draggedItemRef.current = card;
    // Add visual class globally
    if (containerRef.current) containerRef.current.classList.add("is-dragging");
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (status: Card["status"]) => {
      const item = draggedItemRef.current;

      if (item && boardId && status !== item.status) {
        dispatch(updateCardStatus({ boardId, cardId: item.cardId, status }));
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
      <div className="h-full flex flex-col gap-2">
        <FilterBar />
        {cardsLength > 0 ? (
          <section
            ref={containerRef} // Attach Ref here for CSS
            className=" flex flex-wrap content-start gap-2 px-2 grow overflow-auto"
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
      </div>
    </>
  );
}
