import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "src/constants/query-key.constant";
import { useGetUser } from "src/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import {
  acceptFriend as acceptFriendApi,
  deleteFriend as deleteFriendApi,
  deleteFriendRequest,
  getAllFriends,
  deleteFriendRequest as rejectFriendApi,
  sendFriendRequest as sendFriendRequestApi,
} from "src/services/contact.service";

import {
  getAllFriendRequests,
  getAllRequestedFriend,
} from "src/services/contact.service";
import toast from "react-hot-toast";
import { createNewConversation } from "src/services/chats.service";

export const useGetFriendRequests = () => {
  const { user } = useGetUser();
  const { data: friendRequests } = useQuery({
    queryKey: [QueryKey.FRIEND_REQUEST],
    queryFn: () => getAllFriendRequests({ userId: user!.id }),
  });
  return { friendRequests };
};

export const useGetRequestedFriend = () => {
  const { user } = useGetUser();
  const { data: requestedFriend, isLoading } = useQuery({
    queryKey: [QueryKey.REQUESTED_FRIEND],
    queryFn: () => getAllRequestedFriend({ userId: user!.id }),
  });
  return { requestedFriend, isLoading };
};
export const useAcceptFriendRequest = () => {
  const query = useQueryClient();

  const {
    mutate: acceptFriend,
    isLoading: isAcceptingFriend,
    isSuccess: isAddedFriend,
  } = useMutation({
    mutationFn: acceptFriendApi,
    onSuccess: async (data) => {
      query.invalidateQueries({
        queryKey: [QueryKey.FRIEND_REQUEST],
      });
      toast.success("Successfully added a new friend");
      query.refetchQueries();
      const [user1, user2] = data;
      // after accepting a friend delete a record in friend_request

      await deleteFriendRequest({ userId: user1.user_id });
      // after accepting create 2 new conversation records for 2 users
      await createNewConversation({
        userId: user1.user_id,
        friendId: user1.friend_id,
        roomId: user1.room_id,
        lastMessage: `Two of you now are friend.  `,
        lastMessageAt: new Date().toISOString(),
        lastSendId: user1.user_id,
      });
      await createNewConversation({
        userId: user2.user_id,
        friendId: user2.friend_id,
        roomId: user2.room_id,
        lastMessage: `Two of you now are friend.  `,
        lastMessageAt: new Date().toISOString(),

        lastSendId: user2.user_id,
      });
    },
    onError: () => toast.error("There were some errors try again."),
  });
  return {
    isAcceptingFriend,
    acceptFriend,
    isAddedFriend,
  };
};
export const useDeleteFriend = () => {
  const query = useQueryClient();

  const { mutate: deleteFriend, isLoading: isDeletingFriend } = useMutation({
    mutationFn: deleteFriendApi,
    onSuccess: () => {
      toast.success("Successfully deleted this friend");
      query.invalidateQueries({ queryKey: [QueryKey.ALL_FRIENDS] });
    },
    onError: () => toast.error("There were some errors try again."),
  });
  return { deleteFriend, isDeletingFriend };
};
export const useRejectFriend = () => {
  const query = useQueryClient();

  const { mutate: rejectFriend, isLoading: isRejectingFriend } = useMutation({
    mutationFn: rejectFriendApi,
    onSuccess: () => {
      toast.success("Successfully rejected friend");
      query.invalidateQueries({
        queryKey: [QueryKey.FRIEND_REQUEST],
      });
    },
    onError: () => toast.error("There were some errors try again."),
  });
  return { rejectFriend, isRejectingFriend };
};
export const useFriendRequest = () => {
  const query = useQueryClient();
  const { isLoading: isSendingFriendRequest, mutate: sendFriendRequest } =
    useMutation({
      mutationFn: sendFriendRequestApi,
      onSuccess: () => {
        toast.success("Sent a request to this friend");
        query.invalidateQueries({
          queryKey: [QueryKey.FRIEND_REQUEST],
        });
      },
      onError: () => toast.error("There were some errors try again."),
    });

  return {
    isSendingFriendRequest,
    sendFriendRequest,
  };
};
export const useGetAllFriends = (userId: string) => {
  const { data: friends, isLoading } = useQuery({
    queryKey: [QueryKey.ALL_FRIENDS],
    queryFn: () => getAllFriends({ userId }),
  });
  return { friends, isLoading };
};
