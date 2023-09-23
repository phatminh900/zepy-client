import { useEffect, useCallback, useState } from "react";
import {
  updateUsersConversation,
  useSendImgMessage,
  useSendMessage,
  useSetIsReadConversation,
} from "src/features/chat/chat.hook";
import { addMessage, getMessages } from "src/store/chat/chat.slice";
import {
  useGetAllGroupMembers,
  useGetGroupConverSation,
} from "src/features/groups/groups.hook";
import { useGetUser } from "src/hooks/useAuth";
import {
  useAppDispatch,
  useAppSelector,
} from "src/hooks/useSelectorDispatch.hook";
import { QueryKey } from "src/constants/query-key.constant";
import { useQueryClient } from "@tanstack/react-query";

const useGroupChat = () => {
  const { user: userData } = useGetUser();
  const user = userData!;
  const { conversation, isGettingGroupConversation } =
    useGetGroupConverSation();
  const { members, fetchAllGroupMembers } = useGetAllGroupMembers(
    conversation?.group_id || ""
  );
  const query = useQueryClient();
  const channel = useAppSelector((store) => store.chat.channel);
  const dispatch = useAppDispatch();
  const { setIsRead } = useSetIsReadConversation(
    conversation?.room_id || "",
    "group"
  );
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
    const newMessageUser = {
      authorId: user.id,
      img: file,
      message,
      emoji: ["string"],
      roomId: conversation!.group.room_id!,

      userId: user.id,
    };
    sendImg(newMessageUser).then(async (data) => {
      if (data!.user_id === user!.id) dispatch(addMessage(data!));

      await updateUsersConversation(data!, true, "group");
      query.invalidateQueries({
        queryKey: [QueryKey.GET_GROUPS_CONVERSATIONS],
      });
    });
    members
      ?.filter((member) => member.profile.id !== user.id)
      .forEach((member) => {
        const newMessageFriend = {
          authorId: user.id,
          img: file,

          emoji: ["string"],
          roomId: conversation!.group.room_id!,
          userId: member.profile.id,
        };
        // create a new message for friend broadcast to him/her
        sendImg(newMessageFriend).then(async (data) => {
          if (data!.user_id === user!.id) dispatch(addMessage(data!));

          await updateUsersConversation(data!, false, "group");
          query.invalidateQueries({
            queryKey: [QueryKey.GET_GROUPS_CONVERSATIONS],
          });
          if (channel) {
            channel?.send({
              type: "broadcast",
              event: "receive-message",
              payload: {
                ...data,
              },
            });
          }
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
      roomId: conversation!.group.room_id!,
      userId: user.id,
    };
    sendMessage(newMessageUser).then(async (data) => {
      if (data!.user_id === user!.id) dispatch(addMessage(data!));

      await updateUsersConversation(data!, true, "group");
      query.invalidateQueries({
        queryKey: [QueryKey.GET_GROUPS_CONVERSATIONS],
      });
    });
    // send to all member in the group
    members
      ?.filter((member) => member.profile.id !== user.id)
      .forEach((member) => {
        const newMessageFriend = {
          authorId: user.id,
          message,
          emoji: ["string"],
          roomId: conversation!.group.room_id!,
          userId: member.profile.id,
        };
        // create a new message for friend broadcast to him/her
        sendMessage(newMessageFriend).then(async (data) => {
          if (data!.user_id === user!.id) dispatch(addMessage(data!));

          await updateUsersConversation(data!, false, "group");
          query.invalidateQueries({
            queryKey: [QueryKey.GET_GROUPS_CONVERSATIONS],
          });
          if (channel) {
            channel?.send({
              type: "broadcast",
              event: "receive-message",
              payload: {
                ...data,
              },
            });
          }
        });
      });

    setMessage("");
  };

  useEffect(() => {
    if (conversation) {
      fetchAllGroupMembers();
      setIsRead();
    }
  }, [conversation, setIsRead, fetchAllGroupMembers]);

  // // change conversation delete this old one
  useEffect(() => {
    if (conversation?.room_id) {
      dispatch(getMessages([]));
    }
  }, [conversation?.room_id, dispatch]);
  // // subcribe new channel

  useEffect(() => {
    if (conversation?.group?.name) {
      document.title = `You're in group ${conversation?.group?.name}`;
    }
    return () => {
      document.title = "Zepy";
    };
  }, [conversation?.group?.name]);
  return {
    handleSubmitMessage,
    handleSelectEmoji,
    handleSetMessage,
    handleSelectImg,
    members,
    sendMessage,
    conversation,
    message,
    isGettingGroupConversation,
    isSendingMessage,
  };
};
export default useGroupChat;
