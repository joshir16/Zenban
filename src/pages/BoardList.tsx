import BoardCard from "../components/BoardCard";

export default function BoardList() {
  return (
    <>
      <section className="flex flex-col p-5 gap-5 h-full">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
        </div>
      </section>
    </>
  );
}
