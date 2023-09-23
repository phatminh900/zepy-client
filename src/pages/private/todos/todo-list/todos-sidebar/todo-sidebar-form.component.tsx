import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { useTodoLists } from "src/features/todos/todos.hook";
import { useGetUser } from "src/hooks/useAuth";

const TodoSideBarForm = () => {
  const listName = "listName";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useGetUser();
  const { createANewList, isCreatingANewList } = useTodoLists();
  const onSubmit = handleSubmit((data) => {
    if (!data[listName].trim().length) return;
    !isCreatingANewList &&
      createANewList({ title: data[listName], userId: user!.id });
    reset();
  });
  return (
    <form
      onSubmit={onSubmit}
      className={`flex px-4 py-3 border-y h-[60px] border-y-[var(--color-grey-500)] ${
        errors[listName]?.message && "border-y-[var(--color-danger)]"
      }`}
    >
      <input
        {...register(listName, {
          required: "Please enter something",
        })}
        type="text"
        className="w-full h-full block outline-none border-none"
        placeholder="Add a new list"
      />
      <button
        className="text-2xl ml-auto text-[var(--color-primary)]"
        disabled={isCreatingANewList}
      >
        <HiPlus />
      </button>
    </form>
  );
};
export default TodoSideBarForm;
