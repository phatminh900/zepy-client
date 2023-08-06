import { HiChevronDown } from "react-icons/hi";
import Menu from "src/components/menu";
import styles from "./chats-header.module.css";
const ChatsHeader = () => {
  return (
    <div className="text-xs md:text-base pb-1.5 border-b-[var(--color-grey-200)] border-b">
      {/* filter */}
      <div
        className={`${styles.filter} pl-[var(--gutter-left-component)]  pr-2 flex justify-between`}
      >
        <div className="flex gap-2">
          <button className={styles.active}>All</button>
          <button>UnRead</button>
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
