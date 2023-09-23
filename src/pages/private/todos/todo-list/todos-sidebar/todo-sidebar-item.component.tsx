import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineTrash, HiMenu, HiOutlineSun } from "react-icons/hi";
import SmallNotification from "src/components/small-notification";
import { PARAMS } from "src/constants/searchParams.constant";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";
import { useTodoLists } from "src/features/todos/todos.hook";
import styles from "./todos-sidebar.module.css";
import { ROUTES } from "src/constants/navigation.constant";
const TodoSideBarItem = ({
  path,
  pathname,
  title,
  notificationQuantity,
  id,
  isDefault,
}: {
  path: string;
  id: string;
  pathname: string;
  isDefault: boolean;
  title: string;
  notificationQuantity?: number;
}) => {
  const navigate = useNavigate();
  const { deleteAList } = useTodoLists();
  const { todoLists } = useTodoLists();
  const { isMoBile, isOpenTab } = useOpenTableMobile();
  return (
    <li
      className={`relative hover:bg-[var(--color-primary-light)] ${styles.list}`}
      key={path}
    >
      <NavLink
        to={{
          pathname: path,
          search: isMoBile
            ? `?${PARAMS.isOpenTab}=${isMoBile && !isOpenTab ? "1" : "0"}`
            : "",
        }}
        state={{ prevLink: pathname + "/" + path }}
        className="py-[var(--gutter-left-component)] pr-3 pl-[var(--gutter-left-component)] w-full font-semibold h-full justify-between  flex gap-3.5"
      >
        <div className="flex gap-4 items-center">
          <span className="text-xl">
            {isDefault ? <HiOutlineSun /> : <HiMenu />}
          </span>
          <span>{title}</span>
        </div>
        {notificationQuantity ? (
          <SmallNotification
            className="top-0 right-0 absolute"
            quantity={notificationQuantity}
          />
        ) : null}
        {!isDefault && (
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteAList(
                { id },
                {
                  onSuccess: () => {
                    navigate(`${ROUTES.TODOS}/${todoLists![0].id}`);
                  },
                }
              );
            }}
            className="text-[var(--color-danger)] text-2xl hover:scale-150 duration-200 hover:rotate-12"
          >
            <HiOutlineTrash />
          </button>
        )}
      </NavLink>
    </li>
  );
};
export default TodoSideBarItem;
