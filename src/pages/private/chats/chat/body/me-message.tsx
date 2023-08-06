import { forwardRef, LegacyRef } from "react";

import { formatTime } from "src/utils/format-time";
import styles from "./message.module.css";
import ChatActions from "./chat-actions.componen";
import { useDeleteMessage } from "src/features/chat/chat.hook";

interface IMeMessagePros {
  createdAt: Date | string;
  id: string;
  message: string;
}
const MeMessage = forwardRef(function MeMessage(props: IMeMessagePros, ref) {
  const { message, createdAt, id } = props;
  const { deleteMessage } = useDeleteMessage();
  const handleDeleteMessage = (messageId: string) =>
    deleteMessage({ messageId });
  return (
    <>
      <div
        className={`${styles["message-container"]} flex justify-end  `}
        ref={ref as LegacyRef<HTMLDivElement>}
      >
        <div
          className={`bg-[var(--color-primary-light)] text-[var(--color-grey-900)] px-2 py-1 md:px-3 md:py-2 rounded-md  ${styles.message}`}
        >
          <p>{message}</p>
          <span className={`text-[10px]`}>{formatTime(createdAt)}</span>
          {/* actions */}
          <ChatActions
            onDeleteMessage={handleDeleteMessage}
            position="left"
            id={id}
          />
        </div>
      </div>
    </>
  );
});
export default MeMessage;
