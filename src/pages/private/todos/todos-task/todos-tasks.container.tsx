import TodoTaskHeader from "./todo-task-header.component";
import {
  ChatLayout,
  ChatLayoutContent,
} from "src/components/chat-layout.component";
import TodoTaskForm from "./todo-task-form.component";
import TodoTaskList from "./todo-task-list.component";

const Tasks = () => {
  return (
    <ChatLayout>
      <TodoTaskHeader title="test" />
      <ChatLayoutContent>
        <TodoTaskList />
      </ChatLayoutContent>
      <TodoTaskForm />
    </ChatLayout>
  );
};
export default Tasks;
