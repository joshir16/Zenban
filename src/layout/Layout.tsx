import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";

export default function Layout() {
  return (
    <main className="h-screen w-screen flex flex-1 overflow-hidden">
      <PageNav />
      <div className="flex-1 overflow-y-hidden bg-neutral-900">
        <Outlet />
      </div>
    </main>
  );
}
