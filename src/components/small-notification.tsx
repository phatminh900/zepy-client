import { twMerge } from "tailwind-merge";
const SmallNotification = ({
  className,
  quantity,
}: {
  quantity: number;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex w-4   bg-[var(--color-danger)] items-center text-white justify-center h-4 rounded-full  text-[10px]",
        className
      )}
    >
      {quantity}
    </div>
  );
};
export default SmallNotification;
