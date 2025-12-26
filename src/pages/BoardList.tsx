import { Header } from "../components/Header";

export default function BoardList() {
  return (
    <>
      <Header />
      <section className="flex flex-col p-5 gap-5 h-full">
        <form className="flex w-1/2 justify-center items-center gap-2">
          <input
            type="text"
            placeholder="Board Title"
            className="border border-amber-500 px-2 py-1 flex-2 outline-0"
          />
          <div className="flex-1 flex justify-around gap-2">
            <button type="button" className="flex-1 border border-amber-500">
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 border font-bold px-2 py-1 border-amber-500 transition-all hover:bg-amber-700 hover:text-neutral-950"
            >
              Create
            </button>
          </div>
        </form>

        <div>div</div>
      </section>
    </>
  );
}
