import Menu from "src/components/menu";
import Conversation from "./chats-conversation";

const ChatsConversations = () => {
  return (
    <ul>
      <Menu>
        <Conversation />
        <Conversation />
        <Conversation />
      </Menu>
    </ul>
  );
};
export default ChatsConversations;
