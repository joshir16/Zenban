import { useState, type FormEvent, type MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCard, deleteCard } from "../store/slice/boardSlice";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../store/store";

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

  const cardDetails = useSelector((state: RootState) =>
    state.boards
      .find((board) => board.id === boardId)
      ?.cards.find((card) => card.cardId === cardId),
  );

  const [cardTitle, setCardTitle] = useState(cardDetails?.cardTitle || "");
  const [cardDescription, setCardDescription] = useState(
    cardDetails?.description || "",
  );
  const [tags, setTags] = useState(cardDetails?.tags || "");
  const [priority, setPriority] = useState(cardDetails?.priority || "zen");

  const creationDate: Date = cardDetails?.createdOn
    ? new Date(cardDetails.createdOn)
    : new Date();

  const columnId = "to-do";
  const status = "to-do";

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
        tags,
        status,
      ),
    );
    navigate(`/boards/${boardId}`, { replace: true });
    setCardTitle("");
    setCardDescription("");
  }

  function handleDeleteCard(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(deleteCard(boardId!, cardId!));
    navigate(`/boards/${boardId}`, { replace: true });
  }

  return (
    <>
      <form
        onSubmit={(e) => handleAddCard(e)}
        className="h-min flex flex-col gap-8 p-5 w-full md:w-3/4"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text" htmlFor="cardTitle">
            Title
          </label>
          <input
            type="text"
            name="cardTitle"
            id="cardTitle"
            placeholder="New Card title"
            className="input"
            value={cardTitle}
            required
            onChange={(e) => setCardTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-medium text-text"
            htmlFor="cardDescription"
          >
            Description
          </label>
          <textarea
            name="carcardDescriptiondTitle"
            id="cardDescription"
            placeholder="Add Card description"
            className="input w-full h-60"
            value={cardDescription}
            onChange={(e) => setCardDescription(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text" htmlFor="tags">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="Add Tags"
            className="input"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text" htmlFor="priority">
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            className="input"
            defaultValue={priority}
            required
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="zen" className="bg-background-900">
              Zen
            </option>
            <option value="low" className="bg-background-900">
              Low
            </option>
            <option value="medium" className="bg-background-900">
              Medium
            </option>
            <option value="high" className="bg-background-900">
              High
            </option>
          </select>
        </div>

        <div className="flex  flex-col gap-2">
          <p className="text-sm font-medium text-text block ">
            Created on : {getCurrentTime(creationDate)}
          </p>
        </div>

        <div className="flex gap-5 w-full">
          <button type="submit" className="primaryButton flex-1">
            {cardDetails ? "Update Card" : "Save Card"}
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
