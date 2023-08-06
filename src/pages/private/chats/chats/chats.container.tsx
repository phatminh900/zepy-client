import ChatsHeader from "./chats-header.component";
import { Outlet } from "react-router-dom";
import ChatLists from "./chat-list/chats-list.component";

import MainColumn from "src/ui/main-column/main-column.component";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";

const Chats = () => {
  const { isMoBile, isOpenTab } = useOpenTableMobile();
  const content = (
    <MainColumn>
      {/* Heaser */}
      <ChatsHeader />
      <ChatLists />
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
  return isOpenTab ? <Outlet /> : content;
};
export default Chats;

//
