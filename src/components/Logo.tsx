import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <Link to="/">
        <h1 className="text-3xl md:text-4xl lowercase font-black text-center">
          <span className="text-accent">Zen</span>
          ban
        </h1>
      </Link>
    </>
  );
}
