import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { useTodoTasks } from "src/features/todos/todos.hook";

const TodoTaskForm = () => {
  const taskTitle = "taskTitle";
  const { id } = useParams();
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm();
  const { createANewTask, isCreatingANewTask } = useTodoTasks();
  const onSubmit = handleSubmit((data) => {
    if (!data[taskTitle].trim().length) return;
    !isCreatingANewTask &&
      createANewTask(
        { title: data[taskTitle], isChecked: false, listId: id! },
        { onSuccess: () => reset() }
      );
  });
  return (
    <form
      className={`flex items-center justify-center border border-[var(--color-grey-500)] ${
        errors[taskTitle]?.message && "!border-[var(--color-danger)]"
      }`}
      onSubmit={onSubmit}
    >
      <input
        {...register(taskTitle, {
          required: "This field is required",
          minLength: { value: 1, message: "Must type something" },
        })}
        type="text"
        placeholder="Create a new task"
        className="block w-full h-full flex-1"
      />
      <button className="ml-4 text-xl text-[var(--color-primary)]">
        <HiPlus />
      </button>
    </form>
  );
};
export default TodoTaskForm;
