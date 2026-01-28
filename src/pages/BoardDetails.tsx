import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useParams } from "react-router-dom";

import Card from "../components/Card";
import { Header } from "../components/Header";
import Columns from "../components/Columns";

const columns = [
  { id: "todo", title: "To-do" },
  { id: "inprogress", title: "In Progress" },
  { id: "completed", title: "Completed" },
];

export default function BoardDetails() {
  const { boardId } = useParams();
  const currentBoard = useSelector((state: RootState) =>
    state.boards.find((board) => board.id === boardId),
  );

  const cards = currentBoard?.cards ?? [];

  return (
    <div className="w-full h-screen bg-board">
      <Header />

      {cards.length ? (
        <>
          <section className="p-5 sm:p-3 flex flex-wrap content-start gap-3 h-full overflow-auto">
            {columns.map((col) => (
              <Columns key={col.id}>
                <h5 className="text-sm font-semibold px-2 pt-1">{col.title}</h5>
                <div className="grow p-1 flex flex-wrap gap-1">
                  {cards
                    .filter((card) => card.status === col.id)
                    .map((card) => (
                      <Card card={card} key={card.cardId} />
                    ))}
                </div>
              </Columns>
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
