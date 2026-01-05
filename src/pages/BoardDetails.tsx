import Card from "../components/Card";
import Columns from "../components/Columns";
import { Header } from "../components/Header";

export default function BoardDetails() {
  return (
    <>
      <Header />
      <section className="p-5 sm:p-3 grid grid-cols-3 gap-3 row-auto h-full bg-board overflow-auto">
        <Columns />
        <Columns />
        <Columns />
      </section>
    </>
  );
}
