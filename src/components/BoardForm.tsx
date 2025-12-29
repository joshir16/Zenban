import { Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../store/slice/boardSlice";

export default function BoardForm() {
  const dispatch = useDispatch();
  const [newBoard, setNewBoard] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const board = {
      id: crypto.randomUUID(),
      name: newBoard,
      columns: [],
      cards: [],
    };
    dispatch(createBoard(board));
    setNewBoard("");
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-row w-full text-sm sm:text-md md:text-base px-5 rounded-sm "
    >
      <input
        type="text"
        placeholder="Board Title"
        value={newBoard}
        onChange={(e) => setNewBoard(e.target.value)}
        className="flex-1 text-neutral-400 outline-0  border-b border-neutral-500"
      />
      <button type="submit">
        <Plus className="size-7 text-amber-300 hover:text-amber-500 px-1 border-b border-neutral-500" />
      </button>
    </form>
  );
}
