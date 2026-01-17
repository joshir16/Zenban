export default function Welcome() {
  return (
    <div className="w-full h-full flex justify-center py-50">
      <div className="flex w-full sm:w-2/3 h-min justify-center items-center flex-col">
        <h1 className="text-lg sm:text-xl md:text-4xl  font-black text-center mb-2">
          Welcome to <span className="text-accent">zen</span>
          ban
        </h1>
        <p className="text-stone-500 mb-5">Please create a new board</p>
      </div>
    </div>
  );
}
