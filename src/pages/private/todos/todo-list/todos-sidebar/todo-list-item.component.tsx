import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineTrash,
  HiMenu,
  HiOutlineSun,
  HiOutlinePencil,
} from "react-icons/hi";
import SmallNotification from "src/components/small-notification";
import { PARAMS } from "src/constants/searchParams.constant";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";
import { useTodoLists } from "src/features/todos/todos.hook";
import styles from "./todos-sidebar.module.css";
import { ROUTES } from "src/constants/navigation.constant";
import Modal from "src/components/modal";
import ConfirmDelete from "src/components/confirm-delete.component";
import { useEffect, useRef, useState } from "react";
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
  const { deleteAList, isDeletingAList } = useTodoLists();
  const { todoLists, modifyListName, isModifyingListName } = useTodoLists();
  const { isMoBile, isOpenTab } = useOpenTableMobile();
  const listNameRef = useRef<HTMLInputElement | null>(null);
  const [isOpenModify, setIsOpenModify] = useState(false);
  const handleModifyList = (value: string) => {
    modifyListName({ field: "title", value, id });
  };
  useEffect(() => {
    if (listNameRef.current && isOpenModify) {
      listNameRef.current.focus();
    }
  }, [isOpenModify]);
  return (
    <Modal>
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
            {isOpenModify ? (
              <input
                disabled={isModifyingListName}
                onBlur={() => handleModifyList(listNameRef.current!.value)}
                type="text"
                ref={listNameRef}
                defaultValue={title}
              />
            ) : (
              <span>{title}</span>
            )}
          </div>
          {notificationQuantity ? (
            <SmallNotification
              className="top-0 right-0 absolute"
              quantity={notificationQuantity}
            />
          ) : null}
          {!isDefault && (
            <div className="flex items-center gap-2  text-2xl">
              <button
                className="hover:scale-150 duration-200 hover:rotate-12 text-[var(--color-grey-700 )]"
                onClick={() => {
                  setIsOpenModify((prev) => !prev);
                }}
              >
                <HiOutlinePencil />
              </button>
              <Modal.Button name="delete-todo-list">
                <button className="text-[var(--color-danger)] hover:scale-150 duration-200 hover:rotate-12">
                  <HiOutlineTrash />
                </button>
              </Modal.Button>
            </div>
          )}
        </NavLink>
        <Modal.Window className="!h-auto" name="delete-todo-list">
          <ConfirmDelete
            resourceName="This list"
            disabled={isDeletingAList}
            onClose={() => {}}
            onConfirm={() =>
              deleteAList(
                { id },
                {
                  onSuccess: () => {
                    navigate(`${ROUTES.TODOS}/${todoLists![0].id}`);
                  },
                }
              )
            }
          />
        </Modal.Window>
      </li>
    </Modal>
  );
};
export default TodoSideBarItem;
