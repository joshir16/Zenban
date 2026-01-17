import { useState, type FormEvent, type MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { createCard, deleteCard } from "../store/slice/boardSlice";
import { useNavigate, useParams } from "react-router-dom";

function getCurrentTime(date: Date | string) {
  const dateTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  }).format(new Date(date));
  return dateTime;
}

export default function CardForm() {
  const { boardId, cardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");

  const creationDate: Date = new Date();

  const priority = "low";
  const tags = ["JavaScript", "React"];
  const columnId = "to-do";

  function handleAddCard(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!boardId && !cardId && !cardDescription && !priority && !tags) return;

    dispatch(
      createCard(
        boardId!,
        cardId!,
        cardTitle,
        cardDescription,
        priority,
        creationDate.toISOString(),
        columnId,
        tags
      )
    );
    navigate(`/boards/${boardId}`);
    setCardTitle("");
    setCardDescription("");
  }

  function handleDeleteCard(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(deleteCard(boardId!, cardId!));
    navigate(`/boards/${boardId}`);
  }

  return (
    <>
      <form
        onSubmit={(e) => handleAddCard(e)}
        className="h-min flex flex-col gap-5 p-5 w-full md:w-3/4 "
      >
        <div className="flex flex-col gap-2">
          <label className="text-md font-bold" htmlFor="cardTitle">
            Title
          </label>
          <input
            type="text"
            name="cardTitle"
            id="cardTitle"
            placeholder="New Card title"
            className="input"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-bold" htmlFor="cardDescription">
            Description
          </label>
          <textarea
            name="carcardDescriptiondTitle"
            id="cardDescription"
            placeholder="Add Card description"
            className="input w-full"
            rows={5}
            value={cardDescription}
            onChange={(e) => setCardDescription(e.target.value)}
          />
        </div>

        <div className="flex  flex-col gap-2">
          <p className="text-md font-bold block ">
            Created on : {getCurrentTime(creationDate)}
          </p>
        </div>

        <div className="flex gap-5 w-full">
          <button type="submit" className="primaryButton flex-1">
            Save Card
          </button>
          <button
            type="button"
            className="primaryButton flex-1"
            onClick={(e) => handleDeleteCard(e)}
          >
            Delete Card
          </button>
        </div>
      </form>
    </>
  );
}
