import ChatHeader from "src/features/chat/chat-header/chat-header.component";
import ChatMessageList from "src/features/chat/body/chat-message-list.component";
import ChatSendMessage from "src/features/chat/footer/chat-send-message.component";
import { Navigate } from "react-router-dom";
import { ROUTES } from "src/constants/navigation.constant";
import useChatHook from "./chat.hook";
import Loader from "src/ui/Loader";
import DateCalculator from "src/components/date-calculator.component";
import styles from "./chat.module.css";
const Chat = () => {
  const {
    handleSubmitMessage,
    handleSelectEmoji,
    handleSetMessage,
    handleSelectImg,
    conversation,
    message,

    isGettingConversation,
    fiendOnlineStatus,
  } = useChatHook();
  if (!isGettingConversation && isGettingConversation)
    return (
      <div className="relative">
        <Loader />;
      </div>
    );
  if (!conversation && !isGettingConversation)
    return <Navigate to={ROUTES.CHATS} />;

  if (!conversation) return null;
  return (
    <div className="grid h-[100dvh] grid-rows-[65px_1fr_40px] md:grid-rows-[72px_1fr_60px] overflow-hidden [&>*]:px-2 md:[&>*]:px-5">
      {/* Header */}
      <ChatHeader
        onlineStatus={fiendOnlineStatus || ""}
        fullName={conversation.friend_profile.fullname}
        avatar={conversation.friend_profile.avatar}
        render={() => {
          return (
            <>
              {fiendOnlineStatus && fiendOnlineStatus !== "Online" ? (
                <DateCalculator time={fiendOnlineStatus} />
              ) : (
                <p className={`${styles.status} text-xs`}>Just now</p>
              )}
            </>
          );
        }}
      />
      {/* Content Message */}

      <div className="pt-4 pb-2 md:pt-6 md:pb-3 bg-[var(--color-grey-200)] overflow-y-scroll overflow-x-hidden flex-1">
        {/* Friend chat */}
        <ChatMessageList />
      </div>
      {/* footer */}
      <ChatSendMessage
        roomId={conversation.room_id}
        message={message}
        onSelectImg={handleSelectImg}
        onSelectEmoji={handleSelectEmoji}
        onSendMessage={handleSubmitMessage}
        onSetMessage={handleSetMessage}
      />
    </div>
  );
};
export default Chat;
