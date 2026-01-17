import { useSelector } from "react-redux";
import BoardCard from "../components/BoardCard";
import Welcome from "./Welcome";
import type { RootState } from "../store/store";
import BoardForm from "../components/BoardForm";

export default function BoardList() {
  const boardsItem = useSelector((state: RootState) => state.boards);

  return (
    <>
      <section className="flex flex-col p-5 gap-5 h-full relative">
        {boardsItem.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-auto">
              {boardsItem.map((board) => (
                <BoardCard board={board} key={board.id} />
              ))}
            </div>
          </>
        ) : (
          <Welcome />
        )}

        <div className="block sm:hidden absolute bottom-5 left-0 right-0 flex-1 p-5">
          <BoardForm />
        </div>
      </section>
    </>
  );
}
