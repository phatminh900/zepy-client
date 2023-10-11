import { useEffect } from "react";
import TodoTaskHeader from "./todo-task-header.component";
import {
  ChatLayout,
  ChatLayoutContent,
} from "src/components/chat-layout.component";
import TodoTaskForm from "./todo-task-form.component";
import TodoTaskList from "./todo-task-list.component";
import { useTodoLists } from "src/features/todos/todos.hook";
import Loader from "src/ui/Loader";

const Tasks = () => {
  const { todoList, isGettingTodoList, getTodoList } = useTodoLists();
  useEffect(() => {
    getTodoList();
  }, [getTodoList]);
  if (isGettingTodoList)
    return (
      <div className="relative">
        <Loader />
      </div>
    );
  if (!todoList) return <p>No list found</p>;

  return (
    <ChatLayout>
      <TodoTaskHeader />
      <ChatLayoutContent>
        <TodoTaskList />
      </ChatLayoutContent>
      <TodoTaskForm />
    </ChatLayout>
  );
};
export default Tasks;
