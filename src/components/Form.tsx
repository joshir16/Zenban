import getCurrentTime from "../utils/utils";

export default function Form() {
  return (
    <form>
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
        />
      </div>

      <div className="flex gap-5">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-medium text-text" htmlFor="priority">
            Priority
          </label>
          <select name="priority" id="priority" className="input" required>
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
            name="status"
            id="status"
            className="input"
            defaultValue={status}
            required
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

      <div className="flex  flex-col gap-2">
        <p className="text-sm font-medium text-text block ">
          Created on : {getCurrentTime(new Date())}
        </p>
      </div>
    </form>
  );
}
