import Menu from "src/components/menu";
import Conversation from "../chats-conversation.component";
import Loader from "src/ui/Loader";
import useChatListHook from "./chats-list.hook";

const ChatLists = () => {
  const { isGettingConversations, conversations } = useChatListHook();
  if (isGettingConversations) return <Loader />;
  if ((!conversations?.length || !conversations) && !isGettingConversations)
    return (
      <p className="p-[var(--gutter-left-component)] text-center">
        Start a new conversation with your friends
      </p>
    );
  return (
    <ul>
      <Menu>
        {conversations?.map((conversation) => (
          <Conversation
            unReadMessage={conversation.unReadMessageCount}
            key={conversation.id}
            isRead={conversation.isRead}
            roomId={conversation.room_id}
            avatar={conversation.friend_profile.avatar}
            fullName={conversation.friend_profile.fullname}
            authorId={conversation.last_send_profile.id}
            lastMsg={conversation.lastMessage}
            lastMessageAt={conversation.lastMessageAt}
          />
        ))}
      </Menu>
    </ul>
  );
};
export default ChatLists;
