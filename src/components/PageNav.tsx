import { Link, NavLink } from "react-router-dom";
import BoardForm from "./BoardForm";
import { useSelector } from "react-redux";

export default function PageNav() {
  // const navItems = ["React", "JavaScript", "Redux", "Frontend System Design"];

  const navItems = useSelector((state) => state.boards);
  console.log(navItems);

  // if (navItems.length < 1) return null;

  return (
    <nav className="flex flex-col gap-3 overflow-y-auto min-w-1/2 sm:min-w-35 md:min-w-60 p-2">
      <Link to="/">
        <h1 className="text-lg sm:text-2xl md:text-4xl lowercase font-black text-center mb-5">
          <span className="text-accent">Zen</span>
          ban
        </h1>
      </Link>

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
  );
}
