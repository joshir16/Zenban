import { useState, type FormEvent, type MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCard, deleteCard } from "../store/slice/boardSlice";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../store/store";
import getCurrentTime from "../utils/utils";

export default function CardForm() {
  const { boardId, cardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cardDetails = useSelector((state: RootState) =>
    state.boards
      .find((board) => board.id === boardId)
      ?.cards.find((card) => card.cardId === cardId),
  );

  // Initialize State
  const [cardTitle, setCardTitle] = useState(cardDetails?.cardTitle || "");
  const [cardDescription, setCardDescription] = useState(
    cardDetails?.description || "",
  );

  // LOGIC FIX 1: If tags is an array in Redux, join it to string for the input
  const [tags, setTags] = useState(
    Array.isArray(cardDetails?.tags)
      ? cardDetails.tags.join(", ")
      : cardDetails?.tags || "",
  );

  const [priority, setPriority] = useState(cardDetails?.priority || "zen");
  const [status, setStatus] = useState(cardDetails?.status || "todo");

  const creationDate = cardDetails?.createdOn
    ? new Date(cardDetails.createdOn)
    : new Date();

  function handleAddCard(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!boardId || !cardId) return;

    // LOGIC FIX 2: Convert String -> Array before sending to Redux
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    dispatch(
      createCard(
        boardId,
        cardId,
        cardTitle,
        cardDescription,
        status,
        priority,
        tagsArray,
        creationDate.toISOString(),
      ),
    );
    navigate(`/boards/${boardId}`, { replace: true });
  }

  function handleDeleteCard(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!boardId || !cardId) return;

    dispatch(deleteCard({ boardId, cardId }));
    navigate(`/boards/${boardId}`, { replace: true });
  }

  return (
    <section className="h-full overflow-auto w-full md:w-3/4 mx-auto flex flex-col items-center">
      <form
        onSubmit={handleAddCard}
        className="flex flex-col gap-8 p-5 w-full max-w-3xl"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text" htmlFor="cardTitle">
            Title
          </label>
          <input
            type="text"
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
            id="tags"
            placeholder="Add Tags (comma separated)"
            className="input"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-medium text-text" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              className="input"
              value={priority}
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

          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-medium text-text" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              className="input"
              value={status}
              required
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo" className="bg-background-900">
                To-do
              </option>
              <option value="inprogress" className="bg-background-900">
                In Progress
              </option>
              <option value="completed" className="bg-background-900">
                Completed
              </option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-text block ">
            Created on : {getCurrentTime(creationDate)}
          </p>
        </div>

        <div className="flex gap-5 ">
          <button type="submit" className="primaryButton flex-1">
            {cardDetails ? "Update Card" : "Save Card"}
          </button>
          <button
            type="button"
            className="primaryButton flex-1"
            onClick={handleDeleteCard}
          >
            Delete Card
          </button>
        </div>
      </form>
    </section>
  );
}
