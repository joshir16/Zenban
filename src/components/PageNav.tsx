import { NavLink } from "react-router-dom";

export default function PageNav() {
  const navItems = ["React", "JavaScript", "Redux", "Frontend System Design"];
  return (
    <nav className="flex flex-col gap-3 overflow-y-auto min-w-1/2 sm:min-w-35 md:min-w-60 p-2">
      <h1 className="text-lg sm:text-2xl md:text-4xl lowercase font-black text-center mb-5">
        <span className="text-amber-500">Zen</span>
        ban
      </h1>
      {/* <h3 className="text-1xl font-black">my boards</h3> */}
      <ul className="flex flex-1 flex-col gap-5 p-2 sm:p-5">
        {navItems.map((item) => (
          <li key={item} className="w-full">
            <NavLink
              to={""}
              className={`p-1 pr-2 text-sm sm:text-md md:text-base sm:pr-5 border-b w-full hover:border-b-amber-500 transition-colors`}
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
