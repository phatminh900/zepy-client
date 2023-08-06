import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
const ReturnButtonTitle = ({
  className,
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${twMerge("flex items-center gap-1 md:gap-1.5", className)}`}
    >
      <button
        onClick={() => {
          navigate(-1);
          onClick?.();
        }}
        className="text-3xl w-6 h-6 md:w-10  md:h-10 hover:bg-[var(--color-grey-200)] flex items-center justify-center rounded-full"
      >
        <HiChevronLeft />
      </button>
      {children}
    </div>
  );
};
export default ReturnButtonTitle;
