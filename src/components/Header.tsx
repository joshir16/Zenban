import { ArrowLeft, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBoard } from "../store/slice/boardSlice";
import type { RootState } from "../store/store";

export function Header() {
  const dispatch = useDispatch();
  const { boardId } = useParams();

  const currentBoard = useSelector((state: RootState) =>
    state.boards.find((board) => board.id === boardId)
  );

  const navigate = useNavigate();
  const cardId = crypto.randomUUID();

  function handleDelete() {
    dispatch(deleteBoard(boardId));
    navigate("/");
  }

  return (
    <header className="w-full flex justify-between items-center py-3 px-5 border-b bg-board border-accent">
      <div className="flex justify-center items-center gap-5">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={35} className="bg-background-500 rounded-full p-2" />
        </button>
        <h2 className="text-lg md:text-lg font-bold text-accent tracking-wide">
          {currentBoard?.name}
        </h2>
      </div>

      <div className="flex gap-4">
        <Link
          to={`/boards/${boardId}/card/${cardId}`}
          className="group 500px:text-xs sm:text-base flex gap-1 font-semibold justify-between items-center py-1 px-2 hover:bg-accent hover:text-neutral-200 rounded-lg"
        >
          <Plus className="size-5 font-bold text-accent group-hover:text-neutral-200" />
          Create Card
        </Link>
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
