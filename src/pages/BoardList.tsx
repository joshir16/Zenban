import { useSelector } from "react-redux";
import BoardCard from "../components/BoardCard";
import Welcome from "./Welcome";
import type { RootState } from "../store/store";

export default function BoardList() {
  const boardsItem = useSelector((state: RootState) => state.boards);
  console.log(boardsItem);

  return (
    <>
      <section className="flex flex-col p-5 gap-5 h-full bg-board">
        {boardsItem.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              {boardsItem.map((board) => (
                <BoardCard board={board} key={board.id} />
              ))}
            </div>
          </>
        ) : (
          <Welcome />
        )}
      </section>
    </>
  );
}
