import { Plus, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBoard } from "../store/slice/boardSlice";

export function Header() {
  const dispatch = useDispatch();
  const board = useParams();
  const navigate = useNavigate();
  console.log(board.boardId);

  function handleDelete() {
    dispatch(deleteBoard(board.boardId));
    navigate("/");
  }

  return (
    <header className="w-full flex justify-between items-center py-3 px-5 border-b bg-board border-accent">
      <h2 className="text-lg md:text-2xl  font-medium"></h2>

      <div className="flex gap-4">
        <button className="group 500px:text-xs sm:text-base flex gap-1 font-semibold justify-between items-center py-1 px-2 hover:bg-accent hover:text-neutral-200">
          <Plus className="size-5 font-bold text-accent group-hover:text-neutral-200" />
          Create Card
        </button>
        <button
          className="group 500px:text-xs sm:text-base flex gap-1 font-semibold justify-between items-center py-1 px-2 hover:bg-accent hover:text-neutral-200 rounded-lg"
          onClick={handleDelete}
        >
          <Trash className="size-5 font-bold text-accent group-hover:text-neutral-200" />
          Delete Board
        </button>
      </div>
    </header>
  );
}
