import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BoardForm() {
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const navigate = useNavigate();

  function handleCreateBoard() {
    if (newBoardTitle.trim()) {
      const id = crypto.randomUUID();
      //TO DO id and board to redux

      navigate(`/board/${newBoardTitle}`);
    }
  }

  return (
    <form
      onSubmit={handleCreateBoard}
      className="flex flex-col sm:flex-row md:w-full md:flex-row lg:w-2/3   justify-center items-center gap-2"
    >
      <input
        type="text"
        placeholder="Board Title"
        className="border border-amber-500 px-2 py-1 outline-0 md:w-full"
        onChange={(e) => setNewBoardTitle(e.target.value)}
        value={newBoardTitle}
      />
      <div className="flex gap-2 w-full">
        <button
          type="submit"
          className="border font-bold px-10 py-1 border-amber-500 transition-all hover:bg-amber-500 hover:text-neutral-950"
        >
          Create
        </button>
      </div>
    </form>
  );
}
