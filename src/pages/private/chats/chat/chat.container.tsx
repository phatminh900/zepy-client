import ChatHeader from "./header/chat-header.component";
import ChatMessageList from "./body/chat-message-list.component";
import ChatSendMessage from "./footer/chat-send-message.component";
import { Navigate } from "react-router-dom";
import { ROUTES } from "src/constants/navigation.constant";
import useChatHook from "./chat.hook";
import Loader from "src/ui/Loader";
import { useGetMessages } from "src/features/chat/chat.hook";
const Chat = () => {
  const {
    handleSubmitMessage,
    handleSelectEmoji,
    handleSetMessage,
    conversation,
    message,
    register,

    isGettingConversation,
    fiendOnlineStatus,
  } = useChatHook();
  if (!conversation && !isGettingConversation)
    return <Navigate to={ROUTES.CHATS} />;
  if (isGettingConversation)
    return (
      <div className="relative">
        <Loader />;
      </div>
    );
  if (!conversation) return null;
  return (
    <div className="grid h-screen grid-rows-[65px_1fr_40px] md:grid-rows-[72px_1fr_60px] overflow-hidden [&>*]:px-2 md:[&>*]:px-5">
      {/* Header */}
      <ChatHeader
        onlineStatus={fiendOnlineStatus || ""}
        fullName={conversation.friend_profile.fullname}
        avatar={conversation.friend_profile.avatar}
      />
      {/* Content Message */}

      <div className="pt-4 pb-1.5 md:pt-6 md:pb-3 bg-[var(--color-grey-200)] overflow-y-scroll flex-1">
        {/* Friend chat */}
        <ChatMessageList />
      </div>
      {/* footer */}
      <ChatSendMessage
        roomId={conversation.room_id}
        message={message}
        onSelectEmoji={handleSelectEmoji}
        onSendMessage={handleSubmitMessage}
        onSetMessage={handleSetMessage}
      />
    </div>
  );
};
export default Chat;
