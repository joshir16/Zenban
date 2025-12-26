import { NavLink } from "react-router-dom";

export default function PageNav() {
  const navItems = ["React", "JavaScript", "Redux", "Frontend System Design"];
  return (
    <nav className="flex flex-col gap-3 overflow-y-auto max-w-80 min-w-1/7 p-2 ">
      <h1 className="text-4xl lowercase font-black text-center mb-5">
        <span className="text-amber-500">Zen</span>
        ban
      </h1>
      {/* <h3 className="text-1xl font-black">my boards</h3> */}
      <ul className="w-full flex flex-col gap-3 p-5">
        {navItems.map((item) => (
          <li key={item} className="w-full">
            <NavLink
              to={""}
              className={`p-1 pr-5 border-b  w-full hover:border-b-amber-500 transition-colors`}
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
