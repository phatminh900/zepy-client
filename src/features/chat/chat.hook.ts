import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { QueryKey } from "src/constants/query-key.constant";
import { useGetUser } from "src/hooks/useAuth";
import { useAppDispatch } from "src/hooks/useSelectorDispatch.hook";
import {
  createImgMessage,
  createNewMessage,
  deleteAllMessages,
  deleteMessage as deleteMessageApi,
  getAllMessages,
  getConversation,
  getConversations,
  updateConversation,
} from "src/services/chats.service";
import { addMessage, setChannel } from "./chat.slice";
import supabase from "src/services/supabase";

export async function updateUsersConversation(
  message: IMessage,
  isUser = true,
  conversationType: "group" | "normal"
) {
  try {
    const conversation = await updateConversation({
      userId: message.user_id,
      roomId: message.room_id,
      field: [
        "isChatted",
        "isRead",
        "lastMessage",
        "lastMessageAt",
        "last_sent_id",
      ],
      value: [
        true,
        isUser ? true : false,
        message.message,
        new Date().toISOString(),
        message.author_id,
      ],
      conversationType,
    });
    // Not is user ===> friend
    if (!isUser) {
      const friendConversationUnReadMessage =
        conversation?.unReadMessageCount || 0;
      // // update friend unread message
      await updateConversation({
        userId: message.user_id,
        roomId: message.room_id,
        field: "unReadMessageCount",
        value: friendConversationUnReadMessage + 1,
        conversationType,
        // last message
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export const useGetConversation = () => {
  const { id } = useParams();
  const { user } = useGetUser();
  const { data: conversation, isLoading: isGettingConversation } = useQuery({
    queryKey: [QueryKey.GET_CONVERSATION, id],
    queryFn: () =>
      getConversation({
        userId: user!.id,
        roomId: id!,
      }),
  });
  return { conversation, isGettingConversation };
};
export const useGetConversations = () => {
  const { user } = useGetUser();

  const { data: conversations, isLoading: isGettingConversations } = useQuery({
    queryKey: [QueryKey.GET_CONVERSATIONS],

    queryFn: () => getConversations({ userId: user!.id }),
  });
  // prefetch last 5 conversations

  return { conversations, isGettingConversations };
};
//
export const useSetIsReadConversation = (
  roomId: string,
  conversationType: "group" | "normal"
) => {
  const query = useQueryClient();
  const { user } = useGetUser();
  const { mutate: setIsRead, isLoading: isSettingIsReadConversation } =
    useMutation({
      mutationFn: () =>
        updateConversation({
          field: ["isRead", "unReadMessageCount"],
          value: [true, 0],
          userId: user!.id,
          roomId,
          conversationType,
        }),
      onSuccess: () => {
        query.invalidateQueries({ queryKey: [QueryKey.GET_CONVERSATIONS] });
      },
    });
  return { setIsRead, isSettingIsReadConversation };
};

export const useSendMessage = () => {
  const query = useQueryClient();
  const dispatch = useAppDispatch();
  const { id: roomId } = useParams();
  const { mutateAsync: sendMessage, isLoading: isSendingMessage } = useMutation(
    {
      mutationFn: createNewMessage,

      onError: () => toast.error("Fail to send this message try again."),
    }
  );
  // receive message
  useEffect(() => {
    if (roomId) {
      // channel.current = supabase.channel(roomId);
      const channel = supabase.channel(roomId);
      dispatch(setChannel(channel));
      // listening on broadcast event
      channel.on("broadcast", { event: "receive-message" }, (payload) => {
        const newMessage = payload.payload;
        dispatch(addMessage(newMessage));
      });

      channel.subscribe();
    }
  }, [roomId, dispatch, query]);
  // useEffect(()=>{
  //   return ()=>{channel?.unsubscribe()}
  // },[])
  return { sendMessage, isSendingMessage };
};
export const useSendImgMessage = () => {
  const query = useQueryClient();
  const { mutateAsync: sendImg, isLoading: isSendingImg } = useMutation({
    mutationFn: createImgMessage,
    onSuccess: async () => {
      query.invalidateQueries({
        queryKey: [
          QueryKey.GET_MESSAGES,
          QueryKey.GET_CONVERSATIONS,
          QueryKey.GET_CONVERSATION,
        ],
      });
    },
    onError: () => toast.error("Fail to send this message try again."),
  });
  return { sendImg, isSendingImg };
};
export const useGetMessages = () => {
  const { id } = useParams();
  const { user } = useGetUser();
  const {
    refetch: fetchMessages,
    data: messages,
    isLoading: isGettingMessages,
  } = useQuery({
    queryKey: [QueryKey.GET_MESSAGES, id],
    queryFn: () => getAllMessages({ userId: user!.id, roomId: id! }),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);
  return { messages, isGettingMessages, fetchMessages };
};
export const useDeleteMessage = () => {
  const query = useQueryClient();
  const { mutate: deleteMessage, isLoading: isDeletingMessage } = useMutation({
    mutationFn: deleteMessageApi,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: [QueryKey.GET_MESSAGES] });
    },
    onError: () => toast.error("Fail to send this message try again."),
  });
  return { deleteMessage, isDeletingMessage };
};
export const useDeleteAllMessages = () => {
  const query = useQueryClient();
  const {
    mutateAsync: deleteWholeConversation,
    isLoading: isDeletingWholeConversation,
  } = useMutation({
    mutationFn: deleteAllMessages,
    onSuccess: () => {
      toast.success("Successfully");
      query.invalidateQueries({ queryKey: [QueryKey.GET_CONVERSATIONS] });
    },
    onError: () => toast.error("Fail to send this message try again."),
  });
  return { deleteWholeConversation, isDeletingWholeConversation };
};
