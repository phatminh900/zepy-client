import { useEffect, useState } from "react";

import styles from "./todo-task-list.module.css";
import closeListSound from "src/assets/mp3/close-list.mp3";
import { HiChevronRight } from "react-icons/hi";
import { useTodoTasks } from "src/features/todos/todos.hook";
import TodoTaskItem from "./todo-task-item.component";
import Loader from "src/ui/Loader";
import { useSearchParams } from "react-router-dom";
import { PARAMS } from "src/constants/searchParams.constant";
import useSound from "src/hooks/useSound.hook";

export enum TASKLISTTYPE {
  "UNCOMPLETED" = "UnCompleted",
  "OVERDUE" = "Overdue",
  "COMPLETED" = "Completed",
}

type ITaskListType = TASKLISTTYPE | "";
const TodoTaskList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultOpenTask = searchParams.get(PARAMS.openTask) as ITaskListType;
  const [openList, setOpenList] = useState<ITaskListType>(
    defaultOpenTask || ""
  );
  const handleOpenList = (name: ITaskListType) => {
    // setOpenList(name);
    searchParams.set(PARAMS.openTask, name);
    setSearchParams(searchParams);
  };
  const { tasks: taskData, isGettingTasks } = useTodoTasks();
  const tasks: ITodoTask[] = taskData || [];
  const unCompletedTask = tasks?.filter((task) => !task.isChecked);
  const completedTask = tasks?.filter((task) => task.isChecked);
  useEffect(() => {
    setOpenList(defaultOpenTask);
  }, [defaultOpenTask]);
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
            title={TASKLISTTYPE.UNCOMPLETED}
            count={unCompletedTask?.length}
          />
        )}
        {openList === TASKLISTTYPE.UNCOMPLETED && (
          <ul className={`space-y-2 ${styles.list} ${styles.active}`}>
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
            title={TASKLISTTYPE.COMPLETED}
            count={completedTask?.length}
          />
        )}
        {openList === TASKLISTTYPE.COMPLETED && (
          <ul className={`space-y-2 ${styles.list} ${styles.active} `}>
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
  const { play: playCloseListSound } = useSound(closeListSound);
  return (
    <div
      onClick={() => {
        if (openList === title) {
          onOpenList("");
          playCloseListSound();
          return;
        }
        onOpenList(title);
      }}
      className="mb-2 flex items-center px-0 py-4 cursor-pointer hover:bg-[var(--color-grey-300)] gap-2"
    >
      <span
        className={` ${styles.icon} ${
          openList === title && styles.active
        } text-xl hover:[&>svg]:rotate-90  `}
      >
        <HiChevronRight />
      </span>
      <span className=" font-bold">{title}</span>
      <span className="ml-2 text-xl">{count}</span>
    </div>
  );
}
