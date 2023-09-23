import { HiOutlineCog, HiOutlineTrash, HiCheck } from "react-icons/hi";
import styles from "./todo-task-item.module.css";
import completedSound from "src/assets/mp3/complete.wav";
import { useTodoTasks } from "src/features/todos/todos.hook";
import useSound from "src/hooks/useSound.hook";
const TodoTaskItem = ({
  title,
  isChecked,
  id,
}: {
  title: string;
  id: string;
  isChecked: boolean;
}) => {
  const { play } = useSound(completedSound);
  const {
    toggleCompletedTask,
    isToggingCompletedTask,
    deleteATask,
    isDeleteATask,
  } = useTodoTasks();
  const toggleCompleted = () => {
    toggleCompletedTask({ id, isChecked: !isChecked });
    !isChecked && play();
  };
  return (
    <li className="flex py-3 px-4  justify-between bg-[var(--color-grey-300)] ">
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
        <button className="text-xl">
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
    </li>
  );
};
export default TodoTaskItem;
