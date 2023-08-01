import { LegacyRef, forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeHolder: string;
  type?: string;
}
const Input = forwardRef(function Input(props: IInput, ref) {
  const { className, placeHolder, type, ...rest } = props;
  return (
    <input
      {...rest}
      ref={ref as LegacyRef<HTMLInputElement>}
      className={twMerge("py-3 text-sm md:text-lg w-full", className)}
      type={type || "text"}
      placeholder={placeHolder}
    />
  );
});
export default Input;
