import {
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineMailOpen,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Button from "src/components/button";
import FormInputRow from "src/components/form-input-row";
import { ROUTES } from "src/constants/navigation.constant";

const Login = () => {
  const navigate = useNavigate();
  return (
    <form className="py-2 px-2  h-full flex flex-col">
      <h2 className="text-center text-lg mb-4">SignUp</h2>
      <FormInputRow icon={<HiOutlineMail />} placeholder="Your Email" />
      <FormInputRow
        icon={<HiOutlineLockClosed />}
        placeholder="Your password"
        inputType="password"
      />
      <Button className="mt-4">Signup</Button>
      <Button
        variation="text"
        className="mt-auto"
        onClick={() => navigate(ROUTES.SIGNUP)}
      >
        Not have an account yet?
      </Button>
    </form>
  );
};
export default Login;
