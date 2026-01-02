import { useSelector } from "react-redux";
import BoardCard from "../components/BoardCard";
import Welcome from "./Welcome";

export default function BoardList() {
  const navItems = useSelector((state) => state.boards);
  console.log(navItems);

  return (
    <>
      <section className="flex flex-col p-5 gap-5 h-full">
        {navItems.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              <BoardCard />
              <BoardCard />
              <BoardCard />
              <BoardCard />
              <BoardCard />
            </div>
          </>
        ) : (
          <Welcome />
        )}
      </section>
    </>
  );
}
