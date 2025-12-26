import { Layout } from "lucide-react";
import React from "react";

export default function BoardCard() {
  return (
    <div className="flex flex-col w-full border p-5 bg-amber-500 rounded-md text-black">
      <div className="flex flex-col flex-1 justify-center items-center p-3">
        <Layout className="size-8" />
        <h3 className="text-2xl font-bold">Board</h3>
      </div>
      <p className="flex-1 flex justify-center items-center text-sm font-medium">
        2 Cards
      </p>
    </div>
  );
}
