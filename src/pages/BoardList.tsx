import BoardForm from "../components/BoardForm";
import { Header } from "../components/Header";
import BoardCard from "../components/BoardCard";
import { useState } from "react";

export default function BoardList() {
  return (
    <>
      <Header />
      <section className="flex flex-col p-5 gap-5 h-full">
        <BoardForm />

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
        </div>
      </section>
    </>
  );
}
