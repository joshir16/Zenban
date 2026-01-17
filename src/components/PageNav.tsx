import { NavLink } from "react-router-dom";
import BoardForm from "./BoardForm";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Logo from "./Logo";

export default function PageNav() {
  const navItems = useSelector((state: RootState) => state.boards);

  return (
    <aside className="hidden sm:flex flex-col gap-7 overflow-y-auto bg-background-700  p-2 z-50 min-w-1/2 sm:min-w-35 md:min-w-60">
      <Logo />

      <nav className=" ">
        {navItems.length > 0 && (
          <>
            <ul className="flex flex-col gap-5 p-2 sm:p-5">
              {navItems.map((item) => (
                <li key={item.id} className="w-full">
                  <NavLink
                    to={`/boards/${item.id}`}
                    className={`p-1 pr-2 text-sm sm:text-md md:text-base sm:pr-5 w-full hover:text-accent font-bold transition-all duration-200`}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </>
        )}
        <BoardForm />
      </nav>
    </aside>
  );
}
