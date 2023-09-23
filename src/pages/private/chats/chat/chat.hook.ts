import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { QueryKey } from "src/constants/query-key.constant";

import {
  updateUsersConversation,
  useGetConversation,
  useSendImgMessage,
  useSendMessage,
  useSetIsReadConversation,
} from "src/features/chat/chat.hook";
import { addMessage, getMessages } from "src/store/chat/chat.slice";
import { useGetUser } from "src/hooks/useAuth";
import {
  useAppDispatch,
  useAppSelector,
} from "src/hooks/useSelectorDispatch.hook";
import { socket } from "src/contexts/call.context";

const useChatHook = () => {
  const { user: userData } = useGetUser();
  const user = userData!;
  const { conversation, isGettingConversation } = useGetConversation();
  const channel = useAppSelector((store) => store.chat.channel);
  const query = useQueryClient();
  const dispatch = useAppDispatch();
  const { id: roomId } = useParams();
  const { setIsRead } = useSetIsReadConversation(roomId!, "normal");
  const [message, setMessage] = useState("");
  const { isSendingMessage, sendMessage } = useSendMessage();
  const { sendImg } = useSendImgMessage();
  const handleSetMessage = (message: string) => {
    setMessage(message);
  };
  const handleSelectEmoji = useCallback(
    (emoji: string) => setMessage((prev) => prev + emoji),
    []
  );
  const handleSelectImg = (file: File) => {
    const userMessage = {
      authorId: user!.id,
      img: file,
      emoji: [],
      roomId: conversation!.room_id,
      userId: user!.id,
    };
    const friendMessage = {
      authorId: user!.id,
      img: file,
      emoji: [],
      roomId: conversation!.room_id,
      userId: conversation!.friend_id,
    };
    sendImg(userMessage).then(async (data) => {
      if (data!.user_id === user!.id) dispatch(addMessage(data!));

      await updateUsersConversation(data!, true, "normal");
      query.refetchQueries({
        queryKey: [QueryKey.GET_CONVERSATIONS],
      });
    });
    sendImg(friendMessage).then(async (data) => {
      if (channel) {
        channel?.send({
          type: "broadcast",
          event: "receive-message",
          payload: {
            ...data,
          },
        });
      }
      await updateUsersConversation(data!, false, "normal");
      query.refetchQueries({
        queryKey: [QueryKey.GET_CONVERSATIONS],
      });
    });
  };
  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const newMessageUser = {
      authorId: user.id,
      message,
      emoji: ["string"],
      roomId: conversation!.room_id,
      userId: user.id,
    };
    const newMessageFriend = {
      authorId: user.id,
      message,
      emoji: ["string"],
      roomId: conversation!.room_id,
      userId: conversation!.friend_id,
    };
    sendMessage(newMessageUser).then(async (data) => {
      if (data!.user_id === user!.id) dispatch(addMessage(data!));

      await updateUsersConversation(data!, true, "normal");
      query.refetchQueries({
        queryKey: [QueryKey.GET_CONVERSATIONS],
      });
    });
    // create a new message for friend broadcast to him/her
    sendMessage(newMessageFriend).then(async (data) => {
      if (data!.user_id === user!.id) dispatch(addMessage(data!));

      if (channel) {
        channel?.send({
          type: "broadcast",
          event: "receive-message",
          payload: {
            ...data,
          },
        });
      }
      const userData = await updateUsersConversation(data!, false, "normal");
      if (userData) {
        socket.emit("send-message-notification", {
          userIdReceive: userData.user_id,
          unReadMessageCount: userData.unReadMessageCount,
        });
      }
      query.refetchQueries({
        queryKey: [QueryKey.GET_CONVERSATIONS],
      });
    });

    setMessage("");
  };
  const fiendOnlineStatus = conversation?.friend_profile.status;

  useEffect(() => {
    if (conversation?.unReadMessageCount) {
      setIsRead();
    }
  }, [conversation?.unReadMessageCount, setIsRead]);
  // change conversation delete this old one
  useEffect(() => {
    if (conversation?.room_id) {
      // refetch when focus to set conversation state to read
      dispatch(getMessages([]));
    }
    // go to other chat ==>
  }, [conversation?.room_id, dispatch]);
  // subcribe new channel

  useEffect(() => {
    if (conversation?.friend_profile.fullname) {
      document.title = `Chatting with ${conversation.friend_profile.fullname}`;
    }
    return () => {
      document.title = "Zepy";
    };
  }, [conversation?.friend_profile.fullname]);
  return {
    handleSubmitMessage,
    handleSelectEmoji,
    handleSetMessage,
    handleSelectImg,
    sendMessage,
    conversation,
    message,
    fiendOnlineStatus,
    isGettingConversation,
    isSendingMessage,
  };
};
export default useChatHook;
