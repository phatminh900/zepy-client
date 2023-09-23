import { useRef, useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useGetAllFriends } from "src/features/contact/contact.hook";
import { useGetUser } from "src/hooks/useAuth";
import {
  useAddMembersToGroup,
  useCreateGroupConversation,
  useCreateNewGroup,
} from "src/features/groups/groups.hook";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const useAddIntoGroup = () => {
  const { user } = useGetUser();
  const { friends } = useGetAllFriends(user!.id);
  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm();
  const formRef = useRef<HTMLFormElement | null>(null);
  // to reset selected friend list
  const [isSuccess, setIsSuccess] = useState(false);
  const { createNewGroup, isCreatingNewGroup } = useCreateNewGroup();
  const { createNewGroupConversation } = useCreateGroupConversation();
  const { addMembers } = useAddMembersToGroup();
  const [selectedFriend, setSelectedFriend] = useState<{ id: string }[]>([
    { id: user!.id },
  ]);
  const handleAddFriend = useCallback((friendId: { id: string }) => {
    setSelectedFriend((prev) =>
      prev.some((f) => f.id === friendId.id)
        ? prev.filter((f) => f.id !== friendId.id)
        : [...prev, friendId]
    );
  }, []);
  const onSubmit = handleSubmit((data) => {
    if (!data.groupName.trim()) return;
    // if only author not have members
    console.log(selectedFriend);
    if (selectedFriend.length === 1) {
      toast.error("A group must have at least 2 people");
      return;
    }
    const roomId = uuidv4();
    createNewGroup(
      { name: data.groupName, authorId: user!.id, roomId },
      {
        onSuccess: (data) => {
          for (let i = 0; i < selectedFriend.length; i++) {
            addMembers({ groupId: data.id, userId: selectedFriend[i].id }).then(
              (data) => {
                createNewGroupConversation({
                  groupId: data.group_id,
                  userId: data.user_id,
                  roomId,
                  lastMessage: `You become a member of this group`,
                  lastMessageAt: new Date().toISOString(),
                  lastSendId: data.user_id,
                });
              }
            );
          }
          reset();
          setSelectedFriend([]);
          setIsSuccess(true);
        },
      }
    );
  });
  useEffect(() => {
    formRef.current?.querySelector("input")?.focus();
  }, []);
  useEffect(() => {
    isSuccess && setIsSuccess(false);
  }, [isSuccess]);
  return {
    errors,
    formRef,
    isSuccess,
    isCreatingNewGroup,
    friends,
    register,
    onSubmit,
    handleAddFriend,
  };
};
export default useAddIntoGroup;
