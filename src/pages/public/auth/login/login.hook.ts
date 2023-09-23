import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { login as loginApi } from "src/services/auth.service";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/constants/navigation.constant";
import { AuthError } from "@supabase/supabase-js";
import { QueryKey } from "src/constants/query-key.constant";
const useLogin = () => {
  const { t } = useTranslation("login");
  const navigate = useNavigate();
  const query = useQueryClient();
  const {
    data,
    isLoading,
    mutate: login,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: ({ user }) => {
      toast.success(t("successLogged"));
      query.setQueryData([QueryKey.USER], user);
      setTimeout(() => {
        navigate(ROUTES.CHATS, { replace: true });
      }, 1500);
    },
    onError: (err: AuthError) => {
      toast.error(err.message);
    },
  });
  return { isLoading, data, login };
};
export default useLogin;
