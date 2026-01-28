import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col gap-5 overflow-hidden bg-background-900">
      <p className="text-2xl font-bold">Page Not Found</p>
      <Link
        to={"/"}
        className="flex flex-col justify-center items-center border p-5 rounded-full hover:text-accent transition-all duration-300"
      >
        <Home className="size-10" />
        Go Home
      </Link>
    </div>
  );
}
