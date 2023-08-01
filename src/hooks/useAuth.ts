import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/constants/navigation.constant";
import { QueryKey } from "src/constants/query-key.constant";
import { getUser, logOut as logOutApi } from "src/services/auth.service";

const useGetUser = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: false,
  });
  return { data, isLoading, refetch };
};
const useLogout = () => {
  const navigate = useNavigate();
  const query = useQueryClient();
  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      query.removeQueries({ queryKey: [QueryKey.USER] });
      navigate(ROUTES.LOGIN);
    },
  });
  return { isLoading, logout };
};
export { useGetUser, useLogout };
