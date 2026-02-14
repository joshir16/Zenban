import { NavLink } from "react-router-dom";
import BoardForm from "../forms/BoardForm";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Logo from "../ui/Logo";
import { Virtuoso } from "react-virtuoso";

export default function PageNav() {
  // const navItems = useSelector((state: RootState) => state.boards);

  const navItems = useSelector(
    (state: RootState) => state.boards.map((b) => ({ id: b.id, name: b.name })),
    // equalityFunction
    (prev, next) => {
      if (prev.length !== next.length) return false;
      return prev.every(
        (item, index) =>
          item.id === next[index].id && item.name === next[index].name,
      );
    },
  );

  return (
    <aside className="hidden sm:flex flex-col gap-5 overflow-y-auto bg-background-700 p-2 z-50 min-w-1/2 sm:min-w-35 md:min-w-60">
      <Logo />
      <BoardForm />

      <nav className="h-full">
        {navItems.length > 0 && (
          <>
            <Virtuoso
              style={{ height: "100%" }}
              data={navItems}
              overscan={200}
              // 2. The Renderer
              itemContent={(_, item) => (
                <div className="w-full px-1 md:px-5 pb-5">
                  <NavLink
                    to={`/boards/${item.id}`}
                    className={({ isActive }) =>
                      `block p-1 pr-2 text-sm sm:text-md md:text-base sm:pr-5 font-bold transition-all duration-200 
              ${isActive ? "text-accent border-b-2 border-accent" : "hover:text-accent"}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </div>
              )}
            />
          </>
        )}
      </nav>
    </aside>
  );
}
