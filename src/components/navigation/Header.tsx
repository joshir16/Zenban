import { memo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoard } from "../../store/slice/boardSlice";

import Modal from "../ui/Modal";
import { AlertTriangleIcon, ArrowLeft, Plus, Trash } from "lucide-react";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { boardId, cardId } = useParams();

  const currentBoard = useSelector((state: RootState) => {
    const board = state.boards.find((board) => board.id === boardId);
    return board?.name || "";
  });

  const navigate = useNavigate();

  function handleCreateCard() {
    const cardId = crypto.randomUUID();
    navigate(`/boards/${boardId}/card/${cardId}`, { replace: true });
  }

  function handleModal() {
    setIsModalOpen(true);
  }

  function handleDelete() {
    dispatch(deleteBoard(boardId!));
    navigate("/");
  }

  return (
    <header className="w-full flex justify-between items-center py-3 px-5 border-b bg-background-700 border-background-500">
      <div className="flex justify-center items-center gap-1 sm:gap-2">
        <button
          onClick={() => navigate(-1)}
          className="flex justify-center items-center gap-1 sm:gap-2"
        >
          <ArrowLeft className="size-8 bg-background-700 rounded-full p-1  hover:bg-background-900 hover:text-accent border border-background-500 hover:border-accent transition-all duration-400 ease-in-out" />
          <span className="hidden sm:block sm:text-lg md:text-lg font-bold text-accent tracking-wide">
            {currentBoard}
          </span>
        </button>
      </div>

      {!cardId && (
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
            onClick={handleModal}
          >
            <Trash className="size-4 sm:size-5 font-bol group-hover:text-accent group-hover:transition-all group-hover:duration-400 group-hover:ease-in-out" />
            Delete Board
          </button>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center">
              <AlertTriangleIcon className="size-7 text-red-700" />
              <h3 className="font-bold text-xl">Delete Board</h3>
            </div>
            <p className="text-sm md:text-md">
              Are you sure you want to delelte board? All of your data will be
              permanently removed. This action cannot be undone.
            </p>
          </div>
          <div className="w-full flex gap-5 justify-end">
            <button
              className="px-5 py-1 bg-background-500 text-text-300 rounded-lg font-semibold"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-5 py-1 rounded-lg text-text-300 bg-red-700 font-semibold"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      </Modal>
    </header>
  );
}

export default memo(Header);
