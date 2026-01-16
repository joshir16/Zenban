import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useParams } from "react-router-dom";

import Card from "../components/Card";
import { Header } from "../components/Header";

export default function BoardDetails() {
  const { boardId } = useParams();
  const currentBoard = useSelector((state: RootState) =>
    state.boards.find((board) => board.id === boardId)
  );

  const cards = currentBoard?.cards ?? [];

  return (
    <div className="w-full h-screen bg-board overflow-none">
      <Header />

      {cards.length ? (
        <>
          <section className="p-5 sm:p-3 flex flex-wrap gap-3 overflow-auto">
            {cards.map((card) => (
              <Card card={card} key={card.cardId} />
            ))}
          </section>
        </>
      ) : (
        <div className="flex w-full h-3/5 justify-center items-center flex-col">
          <p>Please create a new Card</p>
        </div>
      )}
    </div>
  );
}
