import type React from "react";
import type { Card } from "../typo/type";
import { memo } from "react";

interface Prop {
  children: React.ReactNode;
  colId: string;
  draggedItem: Card | null;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (status: Card["status"]) => void;
}

function Columns({
  children,
  handleDragOver,
  handleDrop,
  colId,
  draggedItem,
}: Prop) {
  return (
    <div
      className={`min-h-[15%] md:min-h-1/3 lg:h-full flex-1 min-w-60 bg-columns flex-wrap border border-background-500 ${
        draggedItem ? "border border-dashed border-primary/50" : ""
      }`}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={() => handleDrop(colId as Card["status"])}
    >
      {children}
    </div>
  );
}

export default memo(Columns);
