import { useState, type FormEvent } from "react";
import { Header } from "../components/Header";
import { useDispatch } from "react-redux";
import { createCard } from "../store/slice/boardSlice";
import { useNavigate, useParams } from "react-router-dom";

function getCurrentTime() {
  const dateTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  }).format(new Date());
  return dateTime;
}

export default function CardDetails() {
  const { boardId, cardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");

  const priority = "low";
  const tags = "JavaScript, React";

  function handleAddCard(e: FormEvent<HTMLFormElement>) {
    dispatch(
      createCard(boardId, cardId, cardTitle, cardDescription, priority, tags)
    );
    e.preventDefault();
    navigate(`/boards/${boardId}`);
    setCardTitle("");
    setCardDescription("");
  }

  return (
    <div>
      <Header />
      <form
        onSubmit={(e) => handleAddCard(e)}
        className="h-min p-5 flex flex-col gap-5"
      >
        <div className="flex gap-5">
          <label className="text-md font-bold sm:basis-30" htmlFor="cardTitle">
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
        <div className="flex gap-5 ">
          <label
            className="text-md font-bold sm:basis-30"
            htmlFor="cardDescription"
          >
            Description
          </label>
          <textarea
            name="carcardDescriptiondTitle"
            id="cardDescription"
            placeholder="Add Card description"
            className="input"
            rows={5}
            value={cardDescription}
            onChange={(e) => setCardDescription(e.target.value)}
          />
        </div>

        <div className="flex gap-5 ">
          <p className="text-md font-bold block ">
            Created on : {getCurrentTime()}
          </p>
        </div>

        <div className="flex gap-5">
          <button type="submit" className="primaryButton">
            Save Card
          </button>
          <button type="button" className="primaryButton">
            Delete Card
          </button>
        </div>
      </form>
    </div>
  );
}
