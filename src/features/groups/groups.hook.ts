import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { QueryKey } from "src/constants/query-key.constant";
import { useGetUser } from "src/hooks/useAuth";
import {
  createNewGroup as createNewGroupApi,
  addGroupMembers,
  createNewGroupConversation as createNewGroupConversationApi,
  getAllGroups,
  getGroupConversation,
  getAllGroupMembers,
  getGroupConversations,
} from "src/services/groups.service";
export const useGetGroups = () => {
  const { user } = useGetUser();
  const { data: groups, isLoading: isGettingGroups } = useQuery({
    queryKey: [QueryKey.GET_GROUPS],
    queryFn: () => getAllGroups({ userId: user!.id }),
  });
  return { groups, isGettingGroups };
};
export const useGetGroupConverSation = () => {
  const { user } = useGetUser();
  const { id: groupId } = useParams();
  const { data: conversation, isLoading: isGettingGroupConversation } =
    useQuery({
      queryKey: [QueryKey.GET_GROUP],
      queryFn: () =>
        getGroupConversation({ userId: user!.id, roomId: groupId! }),
    });
  return { conversation, isGettingGroupConversation };
};
export const useGetGroupConverSations = () => {
  const { user } = useGetUser();
  const { data: conversation, isLoading: isGettingGroupConversation } =
    useQuery({
      queryKey: [QueryKey.GET_GROUPS_CONVERSATIONS],
      queryFn: () => getGroupConversations({ userId: user!.id }),
    });
  return { conversation, isGettingGroupConversation };
};
export const useGetAllGroupMembers = (groupId: string) => {
  const {
    refetch: fetchAllGroupMembers,
    data: members,
    isLoading: isGettingGroupMembers,
  } = useQuery({
    queryKey: [QueryKey.GET_GROUP_MEMBERS],
    queryFn: () => getAllGroupMembers({ id: groupId }),
    enabled: false,
  });
  return { fetchAllGroupMembers, members, isGettingGroupMembers };
};
export const useCreateNewGroup = () => {
  const { mutate: createNewGroup, isLoading: isCreatingNewGroup } = useMutation(
    {
      mutationFn: createNewGroupApi,
      onSuccess: () => {
        toast.success("Successfully created!");
      },
    }
  );
  return { createNewGroup, isCreatingNewGroup };
};

export const useAddMembersToGroup = () => {
  const { mutateAsync: addMembers, isLoading: isAddingMembers } = useMutation({
    mutationFn: addGroupMembers,
  });
  return { addMembers, isAddingMembers };
};
export const useCreateGroupConversation = () => {
  const query = useQueryClient();
  const {
    mutate: createNewGroupConversation,
    isLoading: isCreatingGroupConversation,
  } = useMutation({
    mutationFn: createNewGroupConversationApi,
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QueryKey.GET_GROUPS_CONVERSATIONS],
      });
    },
  });
  return { createNewGroupConversation, isCreatingGroupConversation };
};
