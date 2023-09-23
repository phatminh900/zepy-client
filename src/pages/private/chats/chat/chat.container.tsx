import ChatHeader from "src/features/chat/chat-header/chat-header.component";
import ChatMessageList from "src/features/chat/body/chat-message-list.component";
import ChatSendMessage from "src/features/chat/footer/chat-send-message.component";
import { Navigate } from "react-router-dom";
import { ROUTES } from "src/constants/navigation.constant";
import useChatHook from "./chat.hook";
import Loader from "src/ui/Loader";
import DateCalculator from "src/components/date-calculator.component";
import styles from "./chat.module.css";
import {
  ChatLayout,
  ChatLayoutContent,
} from "src/components/chat-layout.component";
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
    <ChatLayout>
      {/* Header */}
      <ChatHeader
        onlineStatus={fiendOnlineStatus || ""}
        fullName={conversation.friend_profile.fullname}
        friendId={conversation.friend_profile.id}
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

      <ChatLayoutContent>
        {/* Friend chat */}
        <ChatMessageList />
      </ChatLayoutContent>
      {/* footer */}
      <ChatSendMessage
        roomId={conversation.room_id}
        message={message}
        onSelectImg={handleSelectImg}
        onSelectEmoji={handleSelectEmoji}
        onSendMessage={handleSubmitMessage}
        onSetMessage={handleSetMessage}
      />
    </ChatLayout>
  );
};
export default Chat;
