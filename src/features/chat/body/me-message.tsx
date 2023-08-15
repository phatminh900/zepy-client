import { forwardRef, LegacyRef } from "react";

import { formatTime } from "src/utils/format-time";
import styles from "./message.module.css";
import ChatActions from "./chat-actions.componen";
import { useAppDispatch } from "src/hooks/useSelectorDispatch.hook";
import { deleteMessage as deleteMessageAction } from "src/features/chat/chat.slice";
import { useDeleteMessage } from "src/features/chat/chat.hook";
import ChatMessageDetail from "./chat-message-detail.component";

interface IMeMessagePros {
  createdAt: Date | string;
  id: string;
  message: string;
}
const MeMessage = forwardRef(function MeMessage(props: IMeMessagePros, ref) {
  const dispatch = useAppDispatch();
  const { message, createdAt, id } = props;
  const { deleteMessage } = useDeleteMessage();
  const handleDeleteMessage = (messageId: string) =>
    deleteMessage(
      { messageId },
      { onSuccess: () => dispatch(deleteMessageAction(messageId)) }
    );
  return (
    <>
      <li
        className={`${styles["message-container"]} flex justify-end message-item `}
        ref={ref as LegacyRef<HTMLLIElement>}
      >
        <div
          className={`bg-[var(--color-primary-light)] text-[var(--color-grey-900)] px-2 py-1 md:px-3 md:py-2 rounded-md  ${styles.message}`}
        >
          <ChatMessageDetail
            createdAt={createdAt as string}
            id={id}
            message={message}
            onDeleteMessage={handleDeleteMessage}
          />
        </div>
      </li>
    </>
  );
});
export default MeMessage;
