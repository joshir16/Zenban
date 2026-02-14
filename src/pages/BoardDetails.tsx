import CardSection from "../components/CardSection";
import { Header } from "../components/navigation/Header";

export default function BoardDetails() {
  return (
    <div className="w-full h-screen bg-board flex flex-col gap-2">
      <Header />
      <CardSection />
    </div>
  );
}
