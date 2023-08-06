import { useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "src/constants/query-key.constant";
import { useGetConversations } from "src/features/chat/chat.hook";
import { useGetUser } from "src/hooks/useAuth";
import { getAllMessages, getConversation } from "src/services/chats.service";

const useChatListHook = () => {
  const { user } = useGetUser();
  const { conversations, isGettingConversations } = useGetConversations();
  const query = useQueryClient();
  //   automatically prefetch 5 latest conversations
  if (conversations && conversations.length > 0) {
    conversations.slice(0, 5).forEach((conversation) => {
      query.prefetchQuery({
        queryKey: [QueryKey.GET_CONVERSATION],
        queryFn: () =>
          getConversation({ userId: user!.id, roomId: conversation.room_id }),
      });
    });
  }
  //   automatically prefetch 5 latest conversations message
  if (conversations && conversations.length > 0) {
    conversations.slice(0, 5).forEach((conversation) => {
      query.prefetchQuery({
        queryKey: [QueryKey.GET_MESSAGES],
        queryFn: () =>
          getAllMessages({ userId: user!.id, roomId: conversation.room_id }),
      });
    });
  }
  return { user, isGettingConversations, conversations };
};
export default useChatListHook;
