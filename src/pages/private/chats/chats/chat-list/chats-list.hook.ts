import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { QueryKey } from "src/constants/query-key.constant";
import { PARAMS } from "src/constants/seachParams.constant";
import { useGetConversations } from "src/features/chat/chat.hook";
import { useGetGroupConverSations } from "src/features/groups/groups.hook";
import { useGetUser } from "src/hooks/useAuth";
import { getAllMessages, getConversation } from "src/services/chats.service";

const useChatListHook = () => {
  const { user } = useGetUser();
  const { conversations: data = [], isGettingConversations } =
    useGetConversations();
  const { conversation: groupConversations = [] } = useGetGroupConverSations();
  const query = useQueryClient();
  const [searchParams] = useSearchParams();
  // change group conversation to exact shape with normal conversation
  const conversations = [
    ...data,
    ...groupConversations.map(({ group, ...rest }) => ({
      ...rest,
      friend_profile: { ...group, fullname: group.name },
    })),
  ].sort(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
  );
  const filteredConversation = searchParams.get(PARAMS.unRead)
    ? conversations?.filter((conversation) => !conversation.isRead)
    : conversations;
  //   automatically prefetch 5 latest conversations
  // if (conversations && conversations.length > 0) {
  //   conversations.slice(0, 5).forEach((conversation) => {
  //     query.prefetchQuery({
  //       queryKey: [QueryKey.GET_CONVERSATION],
  //       queryFn: () =>
  //         getConversation({ userId: user!.id, roomId: conversation.room_id }),
  //     });
  //     query.prefetchQuery({
  //       queryKey: [QueryKey.GET_CONVERSATION],
  //       queryFn: () =>
  //         getAllMessages({ userId: user!.id, roomId: conversation.room_id }),
  //     });
  //   });
  // }
  //   automatically prefetch 5 latest conversations message

  return { user, isGettingConversations, filteredConversation };
};
export default useChatListHook;
