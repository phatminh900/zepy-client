import React from "react";
import { twMerge } from "tailwind-merge";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variation?: "primary" | "neutral" | "text" | "danger";
  children: React.ReactNode;
}
const Button = ({ variation = "primary", children, ...rest }: ButtonProps) => {
  const classes = {
    base: "px-4 py-2 ",
    primary:
      "font-medium bg-[var(--color-primary)]  text-[var(--color-grey-0)] rounded-md text-center",
    neutral:
      "border border-[var(--color-primary)] font-medium bg-[var(--color-grey-0)]  text-[var(--color-primary)] rounded-md text-center",
    text: "text-[var(--color-primary)] p-0 hover:text-[var(--color-primary-dark)] duration-300",
    danger:
      "text-[var(--color-text-grey-0)] bg-[var(--color-danger)] rounded-sm",
  };
  return (
    <button
      {...rest}
      className={`${twMerge(
        `${classes.base} ${classes[variation]} ${rest.className}`
      )} `}
    >
      {children}
    </button>
  );
};
export default Button;
