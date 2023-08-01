// TODO: separate into individual hook
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "src/constants/query-key.constant";
import { useGetUser } from "src/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import {
  acceptFriend as acceptFriendApi,
  deleteFriend as deleteFriendApi,
  getAllFriend,
  deleteFriendRequest as rejectFriendApi,
  sendFriendRequest as sendFriendRequestApi,
} from "src/services/contact.service";

import {
  getAllFriendRequests,
  getAllRequestedFriend,
} from "src/services/contact.service";
import toast from "react-hot-toast";

export const useGetFriendRequest = () => {
  const { data: user } = useGetUser();
  const { data: friendRequests } = useQuery({
    queryKey: [QueryKey.FRIEND_REQUEST],
    queryFn: () => getAllFriendRequests({ userId: user.id }),
  });
  return { friendRequests };
};

export const useGetRequestedFriend = () => {
  const { data: user } = useGetUser();
  const { data: requestedFriend, isLoading } = useQuery({
    queryKey: [QueryKey.FRIEND_REQUEST],
    queryFn: () => getAllRequestedFriend({ userId: user.id }),
  });
  return { requestedFriend, isLoading };
};
export const useFriendRequest = () => {
  const query = useQueryClient();
  const { isLoading: isSendingFriendRequest, mutate: sendFriendRequest } =
    useMutation({
      mutationFn: sendFriendRequestApi,
      onSuccess: () => {
        toast.success("Sent a request to this friend");
        query.invalidateQueries({ queryKey: [QueryKey.FRIEND_REQUEST] });
      },
      onError: () => toast.error("There were some errors try again."),
    });
  const { mutate: acceptFriend, isLoading: isAcceptingFriend } = useMutation({
    mutationFn: acceptFriendApi,
    onSuccess: () => {
      toast.success("Successfully added a new friend");
      query.invalidateQueries({ queryKey: [QueryKey.FRIEND_REQUEST] });
    },
    onError: () => toast.error("There were some errors try again."),
  });
  const { mutate: deleteFriend, isLoading: isDeletingFriend } = useMutation({
    mutationFn: deleteFriendApi,
    onSuccess: () => {
      toast.success("Successfully deleted this friend");
      query.invalidateQueries({ queryKey: [QueryKey.FRIEND_REQUEST] });
    },
    onError: () => toast.error("There were some errors try again."),
  });
  const { mutate: rejectFriend, isLoading: isRejectingFriend } = useMutation({
    mutationFn: rejectFriendApi,
    onSuccess: () => {
      toast.success("Successfully rejected friend");
      query.invalidateQueries({ queryKey: [QueryKey.FRIEND_REQUEST] });
    },
    onError: () => toast.error("There were some errors try again."),
  });
  return {
    acceptFriend,
    isAcceptingFriend,
    deleteFriend,
    isDeletingFriend,
    rejectFriend,
    isSendingFriendRequest,
    sendFriendRequest,
    isRejectingFriend,
  };
};
export const useGetAllFriend = (userId: string) => {
  const { data: friends, isLoading } = useQuery({
    queryKey: [QueryKey.ALL_FRIENDS],
    queryFn: () => getAllFriend({ userId }),
  });
  return { friends, isLoading };
};
