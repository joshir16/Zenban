import { ArrowLeft, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBoard } from "../store/slice/boardSlice";
import type { RootState } from "../store/store";

export function Header() {
  const dispatch = useDispatch();
  const { boardId } = useParams();

  const currentBoard = useSelector((state: RootState) =>
    state.boards.find((board) => board.id === boardId)
  );

  const navigate = useNavigate();

  function handleCreateCard() {
    const cardId = crypto.randomUUID();
    navigate(`/boards/${boardId}/card/${cardId}`);
  }

  function handleDelete() {
    dispatch(deleteBoard(boardId));
    navigate("/");
  }

  return (
    <header className="w-full flex justify-between items-center py-3 px-5 border-b bg-background-700 border-accent">
      <div className="flex justify-center items-center gap-1 sm:gap-2">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="size-8 bg-background-700 rounded-full p-1  hover:bg-background-900 hover:text-accent border border-background-500 hover:border-accent transition-all duration-400 ease-in-out" />
        </button>
        <h2 className="hidden sm:block sm:text-lg md:text-lg font-bold text-accent tracking-wide">
          {currentBoard?.name}
        </h2>
      </div>

      <div className="flex gap-2 sm:gap-4">
        <button
          onClick={handleCreateCard}
          className="group flex justify-between items-center gap-1 sm:gap-2 text-sm md:text-base bg-background-700 rounded-xl p-2 md:px-3 hover:bg-background-900 hover:text-accent border border-background-500 hover:border-accent transition-all duration-400 ease-in-out"
        >
          <Plus className="size-4 sm:size-5 group-hover:text-accent group-hover:transition-all group-hover:duration-400 group-hover:ease-in-out" />
          <span>Create Card</span>
        </button>

        <button
          className="group flex justify-between items-center gap-1 sm:gap-2 text-sm md:text-base bg-background-700 rounded-xl p-2 md:px-3 hover:bg-background-900 hover:text-accent border border-background-500 hover:border-accent transition-all duration-400 ease-in-out"
          onClick={handleDelete}
        >
          <Trash className="size-4 sm:size-5 font-bol group-hover:text-accent group-hover:transition-all group-hover:duration-400 group-hover:ease-in-out" />
          Delete Board
        </button>
      </div>
    </header>
  );
}
