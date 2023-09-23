import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/constants/navigation.constant";
import { QueryKey } from "src/constants/query-key.constant";
import { useUpdateUserStatus } from "src/features/user/user-feature.hook";
import { socket } from "src/contexts/call.context";
import { getUser, logOut as logOutApi } from "src/services/auth.service";

const useGetUser = () => {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: false,
    retry: false,
  });
  return { user, isLoading, refetch };
};
const useLogout = () => {
  const navigate = useNavigate();
  const { user } = useGetUser();
  const { updateInfo } = useUpdateUserStatus();
  const query = useQueryClient();
  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logOutApi,
    onSuccess: async () => {
      query.removeQueries({ queryKey: [QueryKey.USER] });
      updateInfo({ userId: user!.id, value: new Date().toISOString() });
      socket.emit("leave", { userId: user?.id });
      navigate(ROUTES.LOGIN);
    },
  });
  return { isLoading, logout };
};
export { useGetUser, useLogout };
