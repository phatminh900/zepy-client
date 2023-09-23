import styles from "./message.module.css";
import { HiDotsHorizontal, HiTrash } from "react-icons/hi";
import Menu from "src/components/menu";
import { RiDoubleQuotesR } from "react-icons/ri";
const ChatActions = ({
  id,
  position,
  onDeleteMessage,
}: {
  position: "left" | "right";
  id: string;
  onDeleteMessage: (messageId: string) => void;
}) => {
  return (
    <div
      className={`${styles.actions} ${
        position === "left" ? "-left-[30px]" : "left-[104%]"
      } -1/2 `}
    >
      <Menu.Toggle id={id}>
        <HiDotsHorizontal />
      </Menu.Toggle>
      <Menu.List id={id}>
        <button
          onClick={() => onDeleteMessage(id)}
          className="flex items-center gap-1.5 p-3 rounded-md  text-[var(--color-danger)]"
        >
          <span className="text-lg">
            {" "}
            <HiTrash />
          </span>{" "}
          Delete this message
        </button>
      </Menu.List>
    </div>
  );
};
export default ChatActions;
