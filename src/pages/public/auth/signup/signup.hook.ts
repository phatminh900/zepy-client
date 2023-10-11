import { useTranslation } from "react-i18next";
import { AuthError } from "@supabase/supabase-js";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/constants/navigation.constant";
import { signUp as signUpApi } from "src/services/auth.service";
const useSignup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    mutate: signUp,
  } = useMutation({
    mutationFn: ({ email, password, fullName }: ISignup) =>
      signUpApi({ email, password, fullName }),
    onSuccess: async () => {
      toast.success(t("successSign"));
      // after sign up create a my day default list

      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1000);
    },
    onError: (err: AuthError) => {
      toast.error(err.message);
    },
  });
  return { data, isLoading, signUp };
};
export default useSignup;
