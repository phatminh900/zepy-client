import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { QueryKey } from "src/constants/query-key.constant";
import { useGetUser } from "src/hooks/useAuth";
import {
  createNewMessage,
  deleteAllMessages,
  deleteMessage as deleteMessageApi,
  getAllMessages,
  getConversation,
  getConversations,
  updateConversation,
} from "src/services/chats.service";
export const useGetConversation = () => {
  const { id } = useParams();
  const { user } = useGetUser();

  const { data: conversation, isLoading: isGettingConversation } = useQuery({
    queryKey: [QueryKey.GET_CONVERSATION, id],
    queryFn: () => getConversation({ userId: user!.id, roomId: id! }),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
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
export const useSetIsReadConversation = () => {
  const { id } = useParams();
  const query = useQueryClient();
  const { user } = useGetUser();
  const { mutate: setIsRead, isLoading: isSettingIsReadConversation } =
    useMutation({
      mutationFn: () =>
        updateConversation({
          field: ["isRead", "unReadMessageCount"],
          value: [true, 0],
          userId: user!.id,
          roomId: id!,
        }),
      onSuccess: () => {
        query.invalidateQueries({ queryKey: [QueryKey.GET_CONVERSATIONS] });
      },
    });
  return { setIsRead, isSettingIsReadConversation };
};

export const useSendMessage = () => {
  const query = useQueryClient();
  const { mutate: sendMessage, isLoading: isSendingMessage } = useMutation({
    mutationFn: createNewMessage,
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: [QueryKey.GET_MESSAGES] });
      const [user1, user2] = data;
      //
      await updateConversation({
        userId: user1.user_id,
        roomId: user1.room_id,
        field: [
          "isChatted",
          "isRead",
          "lastMessage",
          "lastMessageAt",
          "last_sent_id",
        ],
        // user 1 sent is read =>true
        value: [
          true,
          true,
          user1.message,
          new Date().toISOString(),
          user1.author_id,
        ],

        // last message
      });
      // user 2 receive is read false
      const friendConversation = await updateConversation({
        userId: user2.user_id,
        roomId: user2.room_id,
        field: [
          "isChatted",
          "isRead",
          "lastMessage",
          "lastMessageAt",
          "last_sent_id",
        ],
        value: [
          true,
          false,
          user2.message,
          new Date().toISOString(),
          user2.author_id,
        ],
        // last message
      });
      const friendConversationUnReadMessage =
        friendConversation.unReadMessageCount;
      // update friend unread message

      await updateConversation({
        userId: user2.user_id,
        roomId: user2.room_id,
        field: "unReadMessageCount",
        value: friendConversationUnReadMessage + 1,
        // last message
      });
    },
    onError: () => toast.error("Fail to send this message try again."),
  });
  return { sendMessage, isSendingMessage };
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
    enabled: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
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
    mutate: deleteWholeConversation,
    isLoading: isDeletingWholeConversation,
  } = useMutation({
    mutationFn: deleteAllMessages,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: [QueryKey.GET_CONVERSATIONS] });
    },
    onError: () => toast.error("Fail to send this message try again."),
  });
  return { deleteWholeConversation, isDeletingWholeConversation };
};
