import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import validator from "validator";
import FormInputRow from "../../../../components/form-input-row";
import Button from "src/components/button";
import { ROUTES } from "src/constants/navigation.constant";
import Input from "src/components/input";
import useSignup from "./signup.hook";
import { useGetUser } from "src/hooks/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const { data: user } = useGetUser();
  const { signUp, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
    getValues,
  } = useForm();
  const { fullName, passwordConfirm, email, password } = errors;
  const onSubmit = handleSubmit((data) => signUp(data as ISignup));
  if (user) {
    return <Navigate to={ROUTES.CHATS} />;
  }
  return (
    <form className="py-2 px-2  h-full flex flex-col" onSubmit={onSubmit}>
      <h2 className="text-center text-lg mb-4">SignUp</h2>
      <FormInputRow
        icon={<HiOutlineUser />}
        errMsg={fullName?.message as string}
      >
        <Input
          {...register("fullName", {
            required: "This field is required",
            minLength: {
              value: 2,
              message: "Your name must be at least 2 characters",
            },
          })}
          placeHolder="Full Name"
        />
      </FormInputRow>
      <FormInputRow icon={<HiOutlineMail />} errMsg={email?.message as string}>
        <Input
          type="email"
          {...register("email", {
            required: "This field is required",
            validate: (val) =>
              validator.isEmail(val) || "Please enter a valid email",
          })}
          placeHolder="Email"
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
          type="password"
          placeHolder="Your password"
        />
      </FormInputRow>

      <FormInputRow
        icon={<HiOutlineLockClosed />}
        errMsg={passwordConfirm?.message as string}
      >
        <Input
          {...register("passwordConfirm", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "PasswordConfirm must be at least 6 characters",
            },
            validate: (val) =>
              getValues().password === val ||
              "Password and passwordConfirm didn't match",
          })}
          type="password"
          placeHolder="Confirm password"
        />
      </FormInputRow>
      <Button disabled={isLoading} className="mt-4">
        {isLoading ? "Submitting..." : "Signup"}
      </Button>
      <Button
        type="button"
        variation="text"
        className="mt-auto italic text-sm"
        onClick={() => navigate(ROUTES.LOGIN)}
      >
        Already have an account?
      </Button>
    </form>
  );
};
export default Signup;
