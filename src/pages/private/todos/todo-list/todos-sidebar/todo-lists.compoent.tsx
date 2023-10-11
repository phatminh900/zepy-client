import { useTranslation } from "react-i18next";
import TodoSideBarForm from "./todo-list-form.component";
import TodoList from "./todo-list.component";
const TodosSideBar = () => {
  const { t } = useTranslation("todos");
  return (
    <div className="flex-1 flex flex-col">
      <h3 className="pl-[var(--gutter-left-component)] text-xl font-bold my-4">
        {t("list.title")}
      </h3>
      <div className="flex flex-col flex-1">
        <TodoList />
        <TodoSideBarForm />
      </div>
    </div>
  );
};
export default TodosSideBar;
