import { createContext, useContext, useState } from "react";
import { HiChevronDown, HiOutlineCheck } from "react-icons/hi";
import useClickOutside from "src/hooks/useClickOutside.hook";
import { twMerge } from "tailwind-merge";
interface Value {
  value: string;
  label: string;
}
interface ISelectContext {
  value: Value;
  isOpen: boolean;
  close: () => void;
  open: (e: React.MouseEvent) => void;
  changeValue: (val: Value) => void;
}

const SelectContext = createContext<ISelectContext | null>(null);
interface ISelect {
  children: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
  defaultValue: Value;
  onChange?: (value: string) => void;
}

const useSelectContext = () => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Using select out of SelectContext");
  return ctx;
};

const Select = ({
  children,
  icon,
  defaultValue,
  className,
  onChange,
}: ISelect) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const changeValue = (value: { value: string; label: string }) => {
    setValue(value);
    onChange?.(value.value);
  };

  const open = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);
  return (
    <div className={`${twMerge("relative z-50", className)} `}>
      <SelectContext.Provider
        value={{
          value,
          isOpen,
          open,
          close,
          changeValue,
        }}
      >
        <div
          onClick={open}
          className={`text-sm lg:text-base cursor-pointer p-2 items-center flex gap-1 ${
            isOpen
              ? "bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]"
              : "bg-[var(--color-grey-300)]"
          }`}
        >
          <span>{icon}</span>
          <p>{value.label}</p>
          <p className="ml-auto">
            <HiChevronDown />
          </p>
        </div>
        {children}
      </SelectContext.Provider>
    </div>
  );
};
const Options = ({ children }: Children) => {
  const { isOpen, close } = useSelectContext();
  const { ref } = useClickOutside(close);
  if (!isOpen) return null;
  return (
    <ul
      ref={ref}
      className="absolute shadow-2xl w-full z-50 bg-[var(--color-grey-0)]"
    >
      {children}
    </ul>
  );
};
const Option = ({
  value: valueOption,
  children,
}: {
  children: React.ReactNode;
  value: string;
}) => {
  const { changeValue, close, value } = useSelectContext();
  const handleClick = () => {
    changeValue({
      value: valueOption,
      label: children!.toString(),
    });
    close();
  };
  return (
    <li className="p-2 w-full flex items-center gap-1">
      <span
        className={`text-[var(--color-primary)] ${
          value.value === valueOption ? "opacity-100" : "opacity-0"
        }`}
      >
        <HiOutlineCheck />
      </span>
      <button onClick={handleClick}>{children}</button>
    </li>
  );
};

Select.Options = Options;
Select.Option = Option;
export default Select;
