import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";

export default function Layout() {
  return (
    <main className="h-screen w-screen flex flex-1 overflow-hidden bg-background-900">
      <PageNav />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </main>
  );
}
