import Card from "../components/Card";
import { Header } from "../components/Header";

export default function BoardDetails() {
  return (
    <>
      <Header />
      <section className="p-5 sm:p-3 grid grid-cols-3 gap-5">
        <div className="col bg-columns flex gap-2">
          <Card />
        </div>
      </section>
    </>
  );
}
