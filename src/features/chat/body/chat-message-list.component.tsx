import { memo, useMemo } from "react";
import { useGetUser } from "src/hooks/useAuth";
import MeMessage from "./me-message";
import FriendMessage from "./friend-message.component";
import Menu from "src/components/menu";
import { differenceInCalendarDays } from "date-fns";
import { useGetMessages } from "src/features/chat/chat.hook";
import useChatMessageList from "./chat-message-list.hook";

interface IMessageByDate {
  [date: string]: IMessage[];
}

const ChatMessageList = memo(function ChatMessageList() {
  return (
    <Menu>
      <MessageList>
        <InitialChatMessage />
      </MessageList>
    </Menu>
  );
});
export default ChatMessageList;
function MessageList({ children }: Children) {
  const { newMessages, isTyping, user } = useChatMessageList();
  return (
    <div className="relative flex flex-col h-full">
      <ul className=" h-full pb-2.5 flex flex-col">
        {children}
        {/* ONLY RE_RENDER NEWEST MESSAGE */}
        <div>
          {newMessages.length > 0 && (
            <h2 className="flex justify-center w-[100px] px-1.5 py-1 bg-[var(--color-grey-300)] text-xs text-center my-3 mx-auto">
              Today
            </h2>
          )}
          <ul className="flex flex-col gap-2">
            {newMessages
              .slice(0, newMessages.length)
              .map((message) =>
                message.author_id === user!.id ? (
                  <MeMessage
                    id={message.id}
                    createdAt={message.created_at}
                    key={message.id}
                    message={message.message}
                  />
                ) : (
                  <FriendMessage
                    id={message.id}
                    email={message.author_profile!.email}
                    fullName={message.author_profile!.fullname}
                    gender={message.author_profile!.gender}
                    createdAt={message.created_at}
                    avatar={message.author_profile!.avatar}
                    key={message.id}
                    message={message.message}
                  />
                )
              )}
          </ul>
        </div>
        {isTyping.isTyping && user!.id !== isTyping.userId && (
          <p className="l-0 bottom-[-15px] text-sm text-[var(--color-primary)] mb-2 mt-auto">
            {isTyping.fullName} is typing...
          </p>
        )}
      </ul>
    </div>
  );
}
function InitialChatMessage() {
  const { messages } = useGetMessages();
  const { user } = useGetUser();
  const messagesList: IMessageByDate | undefined = useMemo(() => {
    return messages?.reduce((acc: IMessageByDate, mes) => {
      let date = (mes.created_at as string).split("T")[0];
      const daysDifferent = differenceInCalendarDays(
        new Date(mes.created_at),
        new Date()
      );
      if (daysDifferent === 0) date = "Today";
      if (daysDifferent === -1) date = "Yesterday";
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(mes);
      return acc;
    }, {});
  }, [messages]);

  if (!messages) return null;
  if (!messages?.length)
    return (
      <p className="rounded-lg  px-1.5 py-2.5 md:px-2 md:py-3 text-[var(--color-primary-dark)] text-center mt-6 bg-[var(--color-primary-light)] flex justify-center">
        Start a new conversation now 😻😻
      </p>
    );
  return (
    <>
      {Object.entries(messagesList || []).map(([time, messages]) => {
        return (
          <div key={time}>
            <h2 className="flex justify-center w-[100px] px-1.5 py-1 bg-[var(--color-grey-300)] text-xs text-center my-3 mx-auto">
              {time}
            </h2>
            <ul className="flex flex-col gap-2">
              {messages
                .slice(0, messages.length)
                .map((message) =>
                  message.author_id === user!.id ? (
                    <MeMessage
                      id={message.id}
                      createdAt={message.created_at}
                      key={message.id}
                      message={message.message}
                    />
                  ) : (
                    <FriendMessage
                      id={message.id}
                      email={message.author_profile!.email}
                      fullName={message.author_profile!.fullname}
                      gender={message.author_profile!.gender}
                      createdAt={message.created_at}
                      avatar={message.author_profile!.avatar}
                      key={message.id}
                      message={message.message}
                    />
                  )
                )}
            </ul>
          </div>
        );
      })}
    </>
  );
}
