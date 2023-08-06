import { memo, useEffect, useMemo, useRef } from "react";
import { useGetUser } from "src/hooks/useAuth";
import MeMessage from "./me-message";
import FriendMessage from "./friend-message.component";
import Menu from "src/components/menu";
import { differenceInDays } from "date-fns";
import { useAppSelector } from "src/hooks/useSelectorDispatch.hook";
import { useGetMessages } from "src/features/chat/chat.hook";

interface IMessageByDate {
  [date: string]: IMessage[];
}

// const weekDays = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];
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
  const { user } = useGetUser();
  const newMessages = useAppSelector((store) => store.chat.messages);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "instant" });
  }, [newMessages]);

  return (
    <div>
      {children}
      {/* ONLY RE_RENDER NEWEST MESSAGE */}
      <div>
        {newMessages.slice(0, -1).map((message) => (
          <div key={message.id}>
            <h2 className="flex justify-center w-[100px] px-1.5 py-1 bg-[var(--color-grey-300)] text-xs text-center my-3 mx-auto">
              Today
            </h2>
            <ul>
              {message.author_id === user!.id ? (
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
              )}

              {/* last message */}
              {newMessages[newMessages.length - 1].author_id === user!.id ? (
                <MeMessage
                  ref={lastMessageRef}
                  id={newMessages[newMessages.length - 1].id}
                  createdAt={newMessages[newMessages.length - 1].created_at}
                  key={newMessages[newMessages.length - 1].id}
                  message={newMessages[newMessages.length - 1].message}
                />
              ) : (
                <FriendMessage
                  ref={lastMessageRef}
                  id={newMessages[newMessages.length - 1]!.id}
                  email={
                    newMessages[newMessages.length - 1]!.author_profile!.email
                  }
                  fullName={
                    newMessages[newMessages.length - 1]!.author_profile!
                      .fullname
                  }
                  gender={
                    newMessages[newMessages.length - 1]!.author_profile!.gender
                  }
                  createdAt={newMessages[newMessages.length - 1]!.created_at}
                  avatar={
                    newMessages[newMessages.length - 1]!.author_profile!.avatar
                  }
                  key={newMessages[newMessages.length - 1]!.id}
                  message={newMessages[newMessages.length - 1]!.message}
                />
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
function InitialChatMessage() {
  const { messages } = useGetMessages();
  const { user } = useGetUser();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const messagesList: IMessageByDate | undefined = useMemo(() => {
    return messages?.reduce((acc: IMessageByDate, mes) => {
      let date = (mes.created_at as string).split("T")[0];

      const daysDifferent = differenceInDays(
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
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);
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
            <ul>
              {messages
                .slice(0, -1)
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
              {messages[messages.length - 1].author_id === user!.id ? (
                <MeMessage
                  ref={lastMessageRef}
                  id={messages[messages.length - 1].id}
                  createdAt={messages[messages.length - 1].created_at}
                  key={messages[messages.length - 1].id}
                  message={messages[messages.length - 1].message}
                />
              ) : (
                <FriendMessage
                  ref={lastMessageRef}
                  id={messages[messages.length - 1]!.id}
                  email={messages[messages.length - 1]!.author_profile!.email}
                  fullName={
                    messages[messages.length - 1]!.author_profile!.fullname
                  }
                  gender={messages[messages.length - 1]!.author_profile!.gender}
                  createdAt={messages[messages.length - 1]!.created_at}
                  avatar={messages[messages.length - 1]!.author_profile!.avatar}
                  key={messages[messages.length - 1]!.id}
                  message={messages[messages.length - 1]!.message}
                />
              )}
            </ul>
          </div>
        );
      })}
    </>
  );
}
