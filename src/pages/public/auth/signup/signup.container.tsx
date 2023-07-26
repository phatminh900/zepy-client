import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi";
import FormInputRow from "../../../../components/form-input-row";
import Button from "src/components/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/constants/navigation.constant";
const Signup = () => {
  const navigate = useNavigate();
  return (
    <form className="py-2 px-2  h-full flex flex-col">
      <h2 className="text-center text-lg mb-4">SignUp</h2>
      <FormInputRow icon={<HiOutlineUser />} placeholder="Your FullName" />
      <FormInputRow icon={<HiOutlineMail />} placeholder="Your Email" />
      <FormInputRow
        icon={<HiOutlineLockClosed />}
        placeholder="Your password"
        inputType="password"
      />
      <FormInputRow
        icon={<HiOutlineLockClosed />}
        placeholder="Confirm password"
        inputType="password"
      />
      <Button className="mt-4">Signup</Button>
      <Button
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
