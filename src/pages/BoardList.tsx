import { useSelector } from "react-redux";
import BoardCard from "../components/BoardCard";
import Welcome from "./Welcome";
import type { RootState } from "../store/store";
import BoardForm from "../components/BoardForm";
import Logo from "../components/Logo";

export default function BoardList() {
  const boardsItem = useSelector((state: RootState) => state.boards);

  return (
    <>
      <section className="flex flex-col content-start p-5 gap-5 h-full ">
        <div className="sm:hidden flex gap-3 flex-col">
          {boardsItem.length > 0 ? <Logo /> : <></>}
          <BoardForm />
        </div>
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
      </section>
    </>
  );
}
