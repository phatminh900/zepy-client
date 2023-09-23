import { Navigate } from "react-router-dom";
import useGroupChat from "./group-chat.hook";
import { ROUTES } from "src/constants/navigation.constant";
import Loader from "src/ui/Loader";
import ChatHeader from "src/features/chat/chat-header/chat-header.component";
import ChatMessageList from "src/features/chat/body/chat-message-list.component";
import ChatSendMessage from "src/features/chat/footer/chat-send-message.component";
import {
  ChatLayout,
  ChatLayoutContent,
} from "src/components/chat-layout.component";
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
    <ChatLayout>
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
      <ChatLayoutContent>
        {/* Friend chat */}
        <ChatMessageList />
      </ChatLayoutContent>
      <ChatSendMessage
        roomId={conversation.group.id}
        message={message}
        onSelectImg={handleSelectImg}
        onSelectEmoji={handleSelectEmoji}
        onSendMessage={handleSubmitMessage}
        onSetMessage={handleSetMessage}
      />
    </ChatLayout>
  );
};
export default GroupChat;
