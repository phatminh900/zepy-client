import { useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import { useTodoTasks } from "src/features/todos/todos.hook";
import TodoTaskItem from "./todo-task-item.component";
import Loader from "src/ui/Loader";
import { useSearchParams } from "react-router-dom";
import { PARAMS } from "src/constants/searchParams.constant";
type ITaskListType = "UnCompleted" | "Overdue" | "Completed" | "";
const TodoTaskList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultOpenTask = searchParams.get(PARAMS.openTask) as ITaskListType;
  const [openList, setOpenList] = useState<ITaskListType>(
    defaultOpenTask || ""
  );
  const handleOpenList = (name: ITaskListType) => {
    setOpenList(name);
    searchParams.set(PARAMS.openTask, name);
    setSearchParams(searchParams);
  };
  const { tasks: taskData, isGettingTasks } = useTodoTasks();
  const tasks: ITodoTask[] = taskData || [];
  const unCompletedTask = tasks?.filter((task) => !task.isChecked);
  const completedTask = tasks?.filter((task) => task.isChecked);
  if (isGettingTasks)
    return (
      <div className="relative h-full">
        <Loader />
      </div>
    );
  if (!tasks.length) return <p>Quickly add a new task now. 🥰🥰🥰</p>;
  return (
    <div>
      <div>
        {unCompletedTask.length > 0 && (
          <TodoTaskListTitle
            openList={openList}
            onOpenList={handleOpenList}
            title="UnCompleted"
            count={unCompletedTask?.length}
          />
        )}
        {openList === "UnCompleted" && (
          <ul className="space-y-2">
            {unCompletedTask?.map((task) => (
              <TodoTaskItem
                id={task.id}
                key={task.id}
                title={task.title}
                isChecked={task.isChecked}
              />
            ))}
          </ul>
        )}
      </div>
      <div>
        {completedTask.length > 0 && (
          <TodoTaskListTitle
            openList={openList}
            onOpenList={handleOpenList}
            title="Completed"
            count={completedTask?.length}
          />
        )}
        {openList === "Completed" && (
          <ul className="space-y-2">
            {completedTask?.map((task) => (
              <TodoTaskItem
                id={task.id}
                key={task.id}
                title={task.title}
                isChecked={task.isChecked}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default TodoTaskList;

function TodoTaskListTitle({
  title,
  count,
  onOpenList,
  openList,
}: {
  openList: string;
  title: ITaskListType;
  onOpenList: (name: ITaskListType) => void;
  count: number;
}) {
  return (
    <div
      onClick={() => onOpenList(openList === title ? "" : title)}
      className="mb-2 flex items-center px-0 py-4 cursor-pointer hover:bg-[var(--color-grey-300)] gap-2"
    >
      <span
        className={`${
          openList === title && "[&>svg]:rotate-90"
        } [&>svg]:duration-500`}
      >
        <HiChevronRight />
      </span>
      <span className=" font-bold">{title}</span>
      <span className="ml-2 text-xl">{count}</span>
    </div>
  );
}
