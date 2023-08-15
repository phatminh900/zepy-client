import { Navigate } from "react-router-dom";
import useGroupChat from "./group-chat.hook";
import { ROUTES } from "src/constants/navigation.constant";
import Loader from "src/ui/Loader";
import ChatHeader from "src/features/chat/chat-header/chat-header.component";
import ChatMessageList from "src/features/chat/body/chat-message-list.component";
import ChatSendMessage from "src/features/chat/footer/chat-send-message.component";
const GroupChat = () => {
  const {
    handleSubmitMessage,
    handleSelectEmoji,
    handleSetMessage,
    handleSelectImg,
    conversation,
    message,
    members,
    isGettingGroupConversation,
  } = useGroupChat();
  if (isGettingGroupConversation)
    return (
      <div className="relative">
        <Loader />;
      </div>
    );
  if (!conversation && !isGettingGroupConversation)
    return <Navigate to={ROUTES.CHATS} />;
  if (!conversation) return null;
  return (
    <div className="grid h-[100dvh] grid-rows-[65px_1fr_40px] md:grid-rows-[72px_1fr_60px] overflow-hidden [&>*]:px-2 md:[&>*]:px-5">
      {/* Header */}
      <ChatHeader
        fullName={conversation.group.name}
        avatar={conversation.group.avatar}
        render={() => (
          <p className="text-xs hover:text-[var(--color-primary)] duration-200 cursor-pointer">
            {members?.length} members
          </p>
        )}
      />
      {/* Content Message */}
      <div className="pt-4 pb-2 md:pt-6 md:pb-3 bg-[var(--color-grey-200)] overflow-y-scroll flex-1">
        {/* Friend chat */}
        <ChatMessageList />
      </div>
      <ChatSendMessage
        roomId={conversation.group.id}
        message={message}
        onSelectImg={handleSelectImg}
        onSelectEmoji={handleSelectEmoji}
        onSendMessage={handleSubmitMessage}
        onSetMessage={handleSetMessage}
      />
    </div>
  );
};
export default GroupChat;
