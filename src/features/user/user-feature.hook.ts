import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser, updateUserAvatar } from "src/services/user.service";

const useUpdateUserAvatar = () => {
  const { isLoading, mutate: updateAvatar } = useMutation({
    mutationFn: ({ userId, avatar }: { userId: string; avatar: any }) =>
      updateUserAvatar(userId, avatar),
    onSuccess: () => {
      toast.success("Updated your avatar");
    },
    onError: () => toast.error("There was some errors try later."),
  });
  return { isLoading, updateAvatar };
};
const useUpdateUserInfo = (field: string) => {
  const { isLoading, mutate: updateInfo } = useMutation({
    mutationFn: ({ userId, value }: { userId: string; value: string }) => {
      return updateUser({ userId, field, value });
    },
    onSuccess: () => {
      toast.success(`Updated your ${field}`);
    },
    onError: () => toast.error("There was some errors try later."),
  });

  return { isLoading, updateInfo };
};
const useUpdateUserStatus = () => {
  const { isLoading, mutate: updateInfo } = useMutation({
    mutationFn: ({ userId, value }: { userId: string; value: string }) => {
      return updateUser({ userId, field: "status", value });
    },
  });

  return { isLoading, updateInfo };
};
export { useUpdateUserAvatar, useUpdateUserInfo, useUpdateUserStatus };
