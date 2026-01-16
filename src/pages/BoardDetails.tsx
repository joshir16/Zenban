import { useSelector } from "react-redux";
import Card from "../components/Card";
import { Header } from "../components/Header";
import type { RootState } from "../store/store";
import { useParams } from "react-router-dom";

export default function BoardDetails() {
  const { boardId } = useParams();
  const currentBoard = useSelector((state: RootState) =>
    state.boards.find((board) => board.id === boardId)
  );

  return (
    <div className="w-full h-screen bg-board overflow-none">
      <Header />
      {currentBoard?.cards.length ? (
        <>
          <section className="p-5 sm:p-3 flex flex-wrap gap-3 overflow-auto">
            <Card />
            <Card />
          </section>
        </>
      ) : (
        <div className="flex w-full h-full justify-center items-center flex-col">
          <p>Please create a new Card</p>
        </div>
      )}
    </div>
  );
}
