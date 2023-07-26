import ChatsHeader from "./chats-header.component";
import { Outlet } from "react-router-dom";
import ChatsConversations from "./chats-conversations";
import useChatHook from "./chats.hook";
import MainColumn from "src/ui/main-column/main-column.container";

const Chats = () => {
  const { isMoBile, isOpenChat } = useChatHook();
  const content = (
    <MainColumn>
      {/* Heaser */}
      <ChatsHeader />
      <ChatsConversations />
    </MainColumn>
  );

  // mobile only show 1 thing either conversations or the chat
  if (!isMoBile)
    return (
      <>
        {content}
        <Outlet />
      </>
    );
  return isOpenChat ? <Outlet /> : content;
};
export default Chats;

//
