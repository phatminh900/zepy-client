import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMessages } from "src/features/chat/chat.hook";
import { useGetUser } from "src/hooks/useAuth";
import { useAppSelector } from "src/hooks/useSelectorDispatch.hook";

const useChatMessageList = () => {
  const { user } = useGetUser();
  const { messages } = useGetMessages();
  const channel = useAppSelector((store) => store.chat.channel);
  const [isTyping, setIsTyping] = useState<{
    isTyping: boolean;
    userId: string;
    fullName: string;
  }>({ isTyping: false, userId: "", fullName: "" });
  const { id: roomId } = useParams();
  const newMessages = useAppSelector((store) => store.chat.messages);
  const prevLastMessage = useRef<Element | null>(null);
  useLayoutEffect(() => {
    // lastMessageRef.current?.scrollIntoView({ behavior: "instant" });
    const messageItems = [...document.querySelectorAll(".message-item")];
    const lastMessage = messageItems[messageItems.length - 1];
    prevLastMessage.current = lastMessage;
    if (lastMessage) {
      (lastMessage as HTMLLIElement).style.paddingBottom = "30px";
      // means ==> me message doesn't have avatar
      // if (lastMessage.childElementCount === 1) {
      //   (lastMessage as HTMLLIElement).style.display = "flex";
      //   (lastMessage as HTMLLIElement).style.alignItems = "end";
      //   (lastMessage as HTMLLIElement).style.flexDirection = "column";
      //   const seenStatusElement = document.createElement("p");
      //   seenStatusElement.className = styles.seenStatus;
      //   seenStatusElement.textContent = `Hello`;
      //   lastMessage.insertAdjacentElement("beforeend", seenStatusElement);
      // }

      // (lastMessage as HTMLLIElement).insertAdjacentHTML(
      //   "afterend",
      //   `<p>Hello</p>`
      // );
      lastMessage.scrollIntoView({ behavior: "instant" });
      return () => {
        (prevLastMessage.current as HTMLDivElement).style.padding = "0";
      };
    }
  }, [messages, newMessages]);
  useEffect(() => {
    if (roomId) {
      channel?.on("broadcast", { event: "typing" }, (payload) => {
        setIsTyping({
          isTyping: payload.payload.isTyping,
          userId: payload.payload.userId,
          fullName: payload.payload.fullName,
        });
      });
    }
  }, [roomId, channel]);
  return { newMessages, isTyping, user };
};
export default useChatMessageList;
