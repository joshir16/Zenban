import { NavLink } from "react-router-dom";
import BoardForm from "./BoardForm";

export default function PageNav() {
  const navItems = ["React", "JavaScript", "Redux", "Frontend System Design"];
  return (
    <nav className="flex flex-col gap-3 overflow-y-auto min-w-1/2 sm:min-w-35 md:min-w-60 p-2">
      <h1 className="text-lg sm:text-2xl md:text-4xl lowercase font-black text-center mb-5">
        <span className="text-amber-500">Zen</span>
        ban
      </h1>

      <ul className="flex flex-col gap-5 p-2 sm:p-5">
        {navItems.map((item) => (
          <li key={item} className="w-full">
            <NavLink
              to={""}
              className={`p-1 pr-2 text-sm sm:text-md md:text-base sm:pr-5 border-b w-full hover:text-amber-500 hover:border-b-amber-500 transition-colors`}
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>

      <BoardForm />
    </nav>
  );
}
