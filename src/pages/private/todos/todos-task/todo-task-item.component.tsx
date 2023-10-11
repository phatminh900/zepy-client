import { useState, useRef } from "react";
import { HiOutlineCog, HiOutlineTrash, HiCheck } from "react-icons/hi";

import styles from "./todo-task-item.module.css";
import completedSound from "src/assets/mp3/complete.wav";
import { useTodoTasks } from "src/features/todos/todos.hook";
import useSound from "src/hooks/useSound.hook";
import RowLayout from "../../settings/row-layout.component";
import Button from "src/components/button";
const TodoTaskItem = ({
  title,
  isChecked,
  id,
}: {
  title: string;
  id: string;
  isChecked: boolean;
}) => {
  const [isOpenModifier, setIsOpenModifier] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { play } = useSound(completedSound);
  const {
    toggleCompletedTask,
    isToggingCompletedTask,
    deleteATask,
    isDeleteATask,
    updateTaskTitle,
    isUpdatingTaskTitle,
  } = useTodoTasks();
  const toggleCompleted = () => {
    toggleCompletedTask({ id, isChecked: !isChecked });
    !isChecked && play();
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current?.value.trim().length) return;
    !isUpdatingTaskTitle &&
      updateTaskTitle({ id, title: inputRef.current.value });
    setIsOpenModifier(false);
  };
  return (
    <li className="flex py-3 px-4  flex-col  bg-[var(--color-grey-300)] ">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleCompleted}
            disabled={isToggingCompletedTask}
            className={`${styles.checkBtn} ${
              isChecked ? "!bg-[var(--color-primary)]" : ""
            }`}
          >
            <span className={`text-sm ${isChecked ? "flex" : "hidden"} `}>
              <HiCheck />
            </span>
          </button>
          <p className={isChecked ? "line-through" : ""}>{title}</p>
        </div>

        <div className="flex gap-1.5">
          <button
            className={`text-xl ${
              isOpenModifier && "text-[var(--color-primary)]"
            }`}
            onClick={() => setIsOpenModifier((prev) => !prev)}
          >
            <HiOutlineCog />
          </button>
          <button
            className="text-xl text-[var(--color-danger)]"
            disabled={isDeleteATask}
            onClick={() => deleteATask({ id })}
          >
            <HiOutlineTrash />
          </button>
        </div>
      </div>
      {isOpenModifier && (
        <form
          onSubmit={handleSubmit}
          className="border-t border-t-[var(--color-grey-800)] py-4"
        >
          <RowLayout title="Title">
            <div className="py-2.5 px-2 bg-[var(--color-grey-200)] ">
              <input
                type="text"
                ref={inputRef}
                defaultValue={title}
                // onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <Button variation="primary">
              {isUpdatingTaskTitle ? "Updating" : "Update"}
            </Button>
          </RowLayout>
        </form>
      )}
    </li>
  );
};
export default TodoTaskItem;
