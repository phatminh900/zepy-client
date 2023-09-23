import { InputHTMLAttributes } from "react";
interface InputRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  defaultChecked?: boolean;
}
const InputRadio = ({
  label,
  defaultChecked = false,
  id,
  name,
  ...rest
}: InputRadioProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="cursor-pointer" htmlFor={id}>
        {label}
      </label>
      <input
        type="radio"
        name={name}
        id={id}
        checked={defaultChecked}
        className="cursor-pointer"
        {...rest}
      />
    </div>
  );
};
export default InputRadio;
