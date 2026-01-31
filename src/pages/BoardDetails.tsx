import CardSection from "../components/CardSection";
import { Header } from "../components/Header";

export default function BoardDetails() {
  return (
    <div className="w-full h-screen bg-board flex flex-col ">
      <Header />
      <CardSection />
    </div>
  );
}
