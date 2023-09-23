import { twMerge } from "tailwind-merge";

const OnlineStatus = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "absolute right-0 bottom-0 w-3 h-3 rounded-full outline-1 outline-[var(--color-grey-0)] bg-[var(--color-secondary)]",
        className
      )}
    >
      &nbsp;
    </div>
  );
};
export default OnlineStatus;
