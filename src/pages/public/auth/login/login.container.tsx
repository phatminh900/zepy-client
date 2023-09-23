import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import validator from "validator";
import Button from "src/components/button";
import FormInputRow from "src/components/form-input-row";
import Input from "src/components/input";
import { ROUTES } from "src/constants/navigation.constant";
import useLogin from "./login.hook";
import { useGetUser } from "src/hooks/useAuth";

const Login = () => {
  const { t } = useTranslation("login");
  const navigate = useNavigate();
  const { user } = useGetUser();
  const { isLoading, login } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
  } = useForm();
  const { email, password } = errors;
  const onSubmit = handleSubmit((data) => login(data as ICredential));
  if (user) {
    return <Navigate to={ROUTES.CHATS} replace />;
  }

  return (
    <form className="py-2 px-2  h-full flex flex-col" onSubmit={onSubmit}>
      <h2 className="text-center text-lg mb-4">{t("login")}</h2>
      <FormInputRow icon={<HiOutlineMail />} errMsg={email?.message as string}>
        <Input
          {...register("email", {
            required: "This field is required",
            validate: (val) =>
              validator.isEmail(val) || "Please provide a valid email",
          })}
          placeHolder={t("email")}
          type="email"
        />
      </FormInputRow>
      <FormInputRow
        icon={<HiOutlineLockClosed />}
        errMsg={password?.message as string}
      >
        <Input
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeHolder={t("password")}
          type="password"
        />
      </FormInputRow>

      <Button disabled={isLoading} className="mt-4">
        {isLoading ? t("loggingIn") : t("logIn")}
      </Button>
      <Button
        type="button"
        variation="text"
        className="mt-auto"
        onClick={() => navigate(ROUTES.SIGNUP)}
      >
        {t("hadAccount")}
      </Button>
    </form>
  );
};
export default Login;
