import { useTranslation } from "react-i18next";

import { useTodoLists } from "src/features/todos/todos.hook";
import TodoSideBarItem from "./todo-list-item.component";
import { useLocation } from "react-router-dom";
import Loader from "src/ui/Loader";

const TodoList = () => {
  const { t } = useTranslation("todos");
  const { todoLists, isGettingTodoLists } = useTodoLists();
  const { pathname } = useLocation();
  const lists = todoLists || [];
  return (
    <ul className="flex-1">
      {isGettingTodoLists && <Loader />}
      {!lists.length ? (
        <p className="text-center text-lg">{t("list.emptyList")} 🥰🥰💪</p>
      ) : (
        lists.map((list) => (
          <TodoSideBarItem
            id={list.id}
            isDefault={list.default}
            key={list.id}
            title={list.title}
            path={list.id}
            pathname={pathname}
            notificationQuantity={0}
          />
        ))
      )}
    </ul>
  );
};
export default TodoList;
