import { HiChevronDown } from "react-icons/hi";
import Menu from "src/components/menu";
import styles from "./chats-header.module.css";
import { PARAMS } from "src/constants/seachParams.constant";
import useSetSearchParams from "src/hooks/useSetSearchParams";
import { useSearchParams } from "react-router-dom";

const ChatsHeader = () => {
  const [searchParam] = useSearchParams();
  const { handleSetSearchParams } = useSetSearchParams();
  const handleUnread = () => {
    handleSetSearchParams(PARAMS.unRead, "true");
  };
  const handleAll = () => {
    handleSetSearchParams(PARAMS.unRead, "");
  };
  return (
    <div className="text-xs md:text-base pb-1.5 border-b-[var(--color-grey-200)] border-b">
      {/* filter */}
      <div
        className={`${styles.filter} pl-[var(--gutter-left-component)]  pr-2 flex justify-between`}
      >
        <div className="flex gap-2">
          <button
            onClick={handleAll}
            className={
              searchParam.get(PARAMS.unRead) === "" ||
              !searchParam.get(PARAMS.unRead)
                ? styles.active
                : ""
            }
          >
            All
          </button>
          <button
            onClick={handleUnread}
            className={
              searchParam.get(PARAMS.unRead) === "true" ? styles.active : ""
            }
          >
            UnRead
          </button>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-0.5">
            Filter <HiChevronDown />
          </button>
          <Menu>
            <Menu.Toggle id="filter" />
            <Menu.List id="filter">
              <Menu.Option onClick={() => {}}>Hello</Menu.Option>
            </Menu.List>
          </Menu>
        </div>
      </div>
    </div>
  );
};
export default ChatsHeader;
