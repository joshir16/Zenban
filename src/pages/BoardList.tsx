import { useSelector } from "react-redux";
import BoardCard from "../components/BoardCard";
import Welcome from "./Welcome";
import type { RootState } from "../store/store";
import BoardForm from "../components/forms/BoardForm";
import Logo from "../components/ui/Logo";
import { VirtuosoGrid } from "react-virtuoso";
import { forwardRef } from "react";

export default function BoardList() {
  const boardsItem = useSelector((state: RootState) => state.boards);

  return (
    <>
      <section className="flex flex-col content-start p-3 gap-5 h-full overflex-x-auto">
        <div className="sm:hidden flex gap-3 flex-col">
          {boardsItem.length > 0 ? <Logo /> : <></>}
          <BoardForm />
        </div>

        {boardsItem.length > 0 ? (
          <VirtuosoGrid
            style={{ height: "100%" }}
            data={boardsItem}
            overscan={200}
            // 2. Define the Grid Layout here
            components={{
              List: forwardRef(({ style, children, ...props }, ref) => (
                <div
                  ref={ref}
                  {...props}
                  style={style}
                  // YOUR GRID CLASSES GO HERE
                  className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2"
                >
                  {children}
                </div>
              )),
              Item: forwardRef(({ children, ...props }, ref) => (
                // Optional: Ensure items take full width of their grid cell
                <div {...props} ref={ref} className="w-full h-full">
                  {children}
                </div>
              )),
            }}
            // 3. Fix the Syntax Error (removed curly braces)
            itemContent={(_, board) => (
              <BoardCard board={board} /> // No 'key' needed here, Virtuoso handles it
            )}
          />
        ) : (
          <Welcome />
        )}
      </section>
    </>
  );
}
