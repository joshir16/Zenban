import { Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../store/slice/boardSlice";
import { useNavigate } from "react-router-dom";

export default function BoardForm() {
  const dispatch = useDispatch();
  const [newBoard, setNewBoard] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newBoard) return null;
    const board = {
      id: crypto.randomUUID(),
      name: newBoard,
      cards: [],
    };
    dispatch(createBoard(board));
    navigate(`/boards/${board.id}`);
    setNewBoard("");
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-row w-full text-sm sm:text-md md:text-base md:px-5 rounded-sm "
    >
      <input
        type="text"
        placeholder="New Board Title"
        value={newBoard}
        onChange={(e) => setNewBoard(e.target.value)}
        className="flex-1 text-text outline-0  border-b border-neutral-500"
      />
      <button type="submit">
        <Plus className="size-7 text-text hover:text-primary px-1 border-b border-neutral-500" />
      </button>
    </form>
  );
}
