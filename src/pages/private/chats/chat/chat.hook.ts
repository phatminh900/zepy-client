import { useEffect, useCallback, useState, useMemo } from "react";
import { useForm } from "react-hook-form";

import {
  useGetConversation,
  useSendMessage,
  useSetIsReadConversation,
} from "src/features/chat/chat.hook";
import { addMessage, addMessages } from "src/features/chat/chat.slice";
import { useGetUser } from "src/hooks/useAuth";
import { useAppDispatch } from "src/hooks/useSelectorDispatch.hook";

const useChatHook = () => {
  const { user: userData } = useGetUser();
  const dispatch = useAppDispatch();

  const user = userData!;
  const { conversation, isGettingConversation } = useGetConversation();
  const { setIsRead } = useSetIsReadConversation();
  const [message, setMessage] = useState("");
  const { register, watch } = useForm();
  const { isSendingMessage, sendMessage } = useSendMessage();
  const handleSetMessage = (message: string) => setMessage(message);
  const handleSelectEmoji = useCallback(
    (emoji: string) => setMessage((prev) => prev + emoji),
    []
  );
  const handleSelectImg = () => {};
  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage = {
      authorId: user.id,
      message,
      emoji: ["string"],
      friendId: conversation!.friend_id,
      roomId: conversation!.room_id,
      userId: user.id,
    };
    // dispatch(addMessage(newMessage));
    sendMessage(newMessage, {
      onSuccess: (data) => {
        dispatch(addMessages(data));
      },
    });
    setMessage("");
  };
  const fiendOnlineStatus = conversation?.friend_profile.status;

  useEffect(() => {
    if (conversation) {
      setIsRead();
    }
  }, [conversation, setIsRead]);

  return {
    handleSubmitMessage,
    handleSelectEmoji,
    handleSetMessage,
    sendMessage,
    conversation,
    message,

    register,
    fiendOnlineStatus,
    isGettingConversation,
    isSendingMessage,
  };
};
export default useChatHook;
