import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import styles from "./todos-sidebar.module.css";
import TodoSideBarForm from "./todo-sidebar-form.component";
import TodoList from "./todo-list.component";
const TodosSideBar = () => {
  const { t } = useTranslation("contact");
  const { pathname } = useLocation();
  return (
    <div className="flex-1 flex flex-col">
      <h3 className="pl-[var(--gutter-left-component)] text-xl font-bold my-4">
        All your lists
      </h3>
      <div className="flex flex-col flex-1">
        <TodoList />
        <TodoSideBarForm />
      </div>
    </div>
  );
};
export default TodosSideBar;
