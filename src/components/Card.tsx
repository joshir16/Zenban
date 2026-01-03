export default function Card() {
  return (
    <div className="flex flex-col w-full border p-5 bg-board rounded-md text-text">
      <div className="flex flex-col flex-1 justify-center items-center p-3">
        <h3 className="text-2xl font-bold">Card name</h3>
      </div>
      <p className="flex-1 flex justify-center items-center text-sm font-medium">
        Cards description
      </p>
    </div>
  );
}
